import Redis from "ioredis";

export interface BaseBufferServiceConfig {
  bufferKey: string;       // Redis key for the buffer
  threshold?: number;      // Number of messages before flushing
  flushInterval?: number;  // Time interval for periodic flushing
}

export abstract class BaseBufferService<T> {
  private readonly threshold: number;
  private readonly flushInterval: number;

  constructor(
      protected redisClient: Redis, // Injected Redis client
      private readonly config: BaseBufferServiceConfig
  ) {
    this.threshold = config.threshold || 3;
    this.flushInterval = config.flushInterval || 5 * 60 * 1000;
    this.startFlushingInterval();
  }

  async processMessage(message: T): Promise<void> {
    await this.redisClient.rpush(this.config.bufferKey, JSON.stringify(message));

    const bufferSize = await this.redisClient.llen(this.config.bufferKey);
    if (bufferSize >= this.threshold) {
      await this.flushToDatabase();
    }
  }

  private async flushToDatabase(): Promise<void> {
    const messages = await this.redisClient.lrange(this.config.bufferKey, 0, this.threshold - 1);
    if (messages.length > 0) {
      const parsedMessages = messages.map((msg) => JSON.parse(msg));
      await this.bulkInsert(parsedMessages);
      await this.redisClient.ltrim(this.config.bufferKey, messages.length, -1);
    }
  }

  protected abstract bulkInsert(messages: T[]): Promise<void>;

  private startFlushingInterval(): void {
    setInterval(async () => {
      const bufferSize = await this.redisClient.llen(this.config.bufferKey);
      if (bufferSize > 0) {
        await this.flushToDatabase();
      }
    }, this.flushInterval);
  }

  async shutdown(): Promise<void> {
    console.log(`Flushing remaining messages from ${this.config.bufferKey} before shutdown...`);
    await this.flushToDatabase();
  }
}
