import { Kafka, Consumer } from "kafkajs";
import Redis from "ioredis";
import { BaseBufferService } from "./BaseBufferService";

export interface BufferClientConfig {
    kafkaConfig: {
        brokers: string[];
        retry?: {
            retries: number;
            initialRetryTime: number;
            factor: number;
        };
    };
    redisConfig: string; // Redis connection string
    bufferServices: {
        topic: string;
        service: BaseBufferService<any>;
    }[];
}

export class BufferClient {
    private kafka: Kafka;
    private consumer: Consumer;
    private redis: Redis;
    private services: Map<string, BaseBufferService<any>>;

    constructor(private config: BufferClientConfig) {
        // Initialize Kafka client
        this.kafka = new Kafka({
            brokers: config.kafkaConfig.brokers,
            retry: config.kafkaConfig.retry,
        });

        this.consumer = this.kafka.consumer({ groupId: "buffer-group" });

        // Initialize Redis client
        this.redis = new Redis(config.redisConfig);

        // Map topics to services
        this.services = new Map(
            config.bufferServices.map(({ topic, service }) => {
                service.setRedisClient(this.redis);
                return [topic, service];
            })
        );
    }

    async start() {
        await this.consumer.connect();

        // Subscribe to all topics
        for (const { topic } of this.config.bufferServices) {
            await this.consumer.subscribe({ topic, fromBeginning: true });
        }

        // Start consuming messages
        await this.consumer.run({
            eachMessage: async ({ topic, message }) => {
                const msgValue = JSON.parse(message.value.toString());
                const service = this.services.get(topic);

                if (service) {
                    try {
                        await service.processMessage(msgValue);
                    } catch (error) {
                        console.error(`Error processing message from ${topic}:`, error);
                    }
                } else {
                    console.warn(`No service registered for topic: ${topic}`);
                }
            },
        });
    }

    pause() {
        console.log("Pausing Kafka consumer...");
        this.consumer.pause(
            Array.from(this.services.keys()).map((topic) => ({ topic }))
        );
    }

    async stop() {
        console.log("Stopping Kafka consumer and flushing buffers...");
        await this.consumer.disconnect();

        // Flush all services
        await Promise.all(
            Array.from(this.services.values()).map((service) => service.shutdown())
        );

        // Close Redis connection
        await this.redis.quit();
    }
}
