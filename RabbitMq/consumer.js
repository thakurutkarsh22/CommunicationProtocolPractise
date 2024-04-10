const ampq = require("amqplib");

async function connect() {
  try {
    const connection = await ampq.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      console.log(message.content.toString());

      channel.ack(message); // It ack the message so that it is removed from the Rabbt MQ
    });
    console.log("WAITING FOR MEsSAGES....");
  } catch (error) {}
}
// jobs in the above line is the channel name
connect();
