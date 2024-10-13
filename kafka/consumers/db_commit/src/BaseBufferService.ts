import redis from "./redisClient.js";
export class BaseBufferService<T>{
  constructor(
    protected bufferKey: string,
    protected threshold = 3,
    protected flushInterval = 5 * 60 * 1000
  ) {
    // Start the periodic flushing
    this.startFlushingInterval();
  }

  // Method to process incoming messages and push them to Redis
  async processMessage(message:T) {
    // Add message to Redis buffer
    await redis.rpush(this.bufferKey, JSON.stringify(message));

    // Check if the buffer has reached the threshold
    const bufferSize = await redis.llen(this.bufferKey);
    if (bufferSize >= this.threshold) {
      await this.flushToDatabase();
    }
  }

  // Method to flush the buffer to the database
  async flushToDatabase() {
    const messages = await redis.lrange(this.bufferKey, 0, this.threshold - 1);

    if (messages.length > 0) {
      // Use an arrow function to call JSON.parse correctly
      const parsedMessages = messages.map((msg) => JSON.parse(msg));

      await this.bulkInsert(parsedMessages); // Abstract method for bulk insert
      await redis.ltrim(this.bufferKey, messages.length, -1); // Remove the inserted messages from Redis buffer
    }
  }

  // Abstract method for bulk insert - to be implemented by subclasses
  async bulkInsert(messages:T[]) {
    throw new Error("bulkInsert method should be implemented by subclass.");
  }

  // Method to start periodic flushing
  startFlushingInterval() {
    setInterval(async () => {
      const bufferSize = await redis.llen(this.bufferKey);
      if (bufferSize > 0) {
        await this.flushToDatabase();
      }
    }, this.flushInterval);
  }

  // Graceful shutdown for flushing pending messages
  async shutdown() {
    console.log(
      `Flushing remaining messages from ${this.bufferKey} before shutdown...`
    );
    await this.flushToDatabase();
  }
}
