// Rabbit MQ -> https://api.cloudamqp.com/console/ebe857e9-398e-43b2-94b9-029fa2718b82/details

const amqp = require("amqplib");

const msg = { number: process.argv[2] };

connect();

async function connect() {
  try {
    const amqpServer =
      "amqps://ouvrahfz:twxJ7Ee0DF6Q2Y0Y2s5Cn2bhgr058RAF@hawk.rmq.cloudamqp.com/ouvrahfz";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
}
