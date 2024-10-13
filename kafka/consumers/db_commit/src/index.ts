// import "dotenv/config";
import kafka from "./kafkaClient.js";
import BountyService from "./BountyBufferService.js";
const bountyService = new BountyService()
async function startKafkaConsumer() {
    const consumer = kafka.consumer({ groupId: 'bountywise-group' });
    await consumer.connect();

    // Subscribe to the topics you want to listen to
    await consumer.subscribe({ topic: 'bounties', fromBeginning: true });
    // await consumer.subscribe({ topic: 'tasks', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const msgValue = JSON.parse(message.value.toString());

            try {
                // Direct the message to the appropriate service based on the topic
                if (topic === 'bounties') {
                    await bountyService.processMessage(msgValue);
                } else if (topic === 'tasks') {
                    // await taskService.processMessage(msgValue);
                }
            } catch (error) {
                console.error(`Error processing message from ${topic}:`, error);
            }
        },
    });
}

// Start the Kafka consumer
startKafkaConsumer().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, flushing buffers and shutting down...');
    await Promise.all([bountyService.shutdown()]);
    process.exit(0);
});