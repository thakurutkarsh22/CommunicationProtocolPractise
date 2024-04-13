const Kafka = require("kafkajs").Kafka;

async function run() {
  try {
    // Connect TCP connection to broker
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: "",
    });
  } catch (error) {
    console.log("Something bad haeepend", error);
  }
}
