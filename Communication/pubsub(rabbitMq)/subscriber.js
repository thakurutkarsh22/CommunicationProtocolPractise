const amqp = require("amqplib");
connect();

async function connect() {
  const amqpServer =
    "amqps://ouvrahfz:twxJ7Ee0DF6Q2Y0Y2s5Cn2bhgr058RAF@hawk.rmq.cloudamqp.com/ouvrahfz";
  const connection = await amqp.connect(amqpServer);
  const channel = await connection.createChannel();
  await channel.assertQueue("jobs");

  channel.consume("jobs", (message) => {
    const input = JSON.parse(message.content.toString());
    console.log(`Recieved job with input ${input.number}`);

    if (input.number == 7) {
      channel.ack(message);
    }
  });

  console.log("waiting for the messages ....");
}
