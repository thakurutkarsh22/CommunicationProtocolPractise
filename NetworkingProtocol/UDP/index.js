// Creation of UDP server ....

const dgram = require("dgram");

const socket = dgram.createSocket("udp4");
socket.bind(5500, "127.0.0.1");
socket.on("message", (message, info) => {
  console.log(
    `My server got a datagram ${message}, from: ${info.address}:${info.port}`
  );
});

// client

// utility that creates UDP and TCP connection i.e, nitcat (nc)

// nc -u 127.0.0.1 5500

// ---- write your message  ---- then see the server
