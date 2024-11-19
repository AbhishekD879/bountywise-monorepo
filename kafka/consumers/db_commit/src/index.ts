
import BountyService from "./BountyBufferService.js";
import {BufferClient} from "@bountywise/basebuffer";
const bountyService = new BountyService()


// Start the buffer client
const bufferClient = new BufferClient({
    kafkaConfig: {
        brokers: ['kafka:9092'],
        retry: {
            retries: 5,
            initialRetryTime: 1000,
            factor: 2,
        },
    },
    redisConfig: `rediss://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT}:${process.env.REDIS_PORT}`,
    bufferServices: [
        {
            topic: 'bounties',
            service: bountyService,
        },
    ],
});

bufferClient.start().catch(console.error);


// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, flushing buffers and shutting down...');
    await bufferClient.stop()
    process.exit(0);
});