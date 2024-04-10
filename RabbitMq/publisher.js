// Advance Message queue Protocol.

const ampq = require("amqplib");

const number = process.argv[2];
const message = {
  number: number,
};

async function connect() {
  try {
    const connection = await ampq.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    //Declaring a queue is idempotent - it will only be created if it doesn't exist already.
    // The message content is a byte array, so you can encode whatever you like there.

    const result = await channel.assertQueue("jobs");

    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
    console.log("JOB SENT SUCCESSFULLY", message.number);
  } catch (error) {
    console.log(error);
  }
}
connect();

// jobs in the above line is the channel name

// READ DOCUMETATION: https://www.rabbitmq.com/tutorials/tutorial-one-javascript
