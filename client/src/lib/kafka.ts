import { Kafka } from "kafkajs";
// import "dotenv/config";
let kafka: Kafka | null = null;

const kafkaInit = () => {
  try {
    if (!kafka) {
      kafka = new Kafka({
        clientId: "my-app",
        brokers: ["kafka:9092"], // Use "kafka" as the service name (internal communication)
        retry: {
          retries: 5, // Set number of retries
          initialRetryTime: 1000, // Retry after 1 second initially
          factor: 2, // Exponential backoff
        },
      });
    }
    return kafka;
  } catch (error: any) {
    console.log(`Error Connecting To Kafka Client Error: ${error}`);
  }
};

export default kafkaInit();
