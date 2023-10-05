const net = require("net");

// const server = net.createConnection((socket) => {
//   // console.log(
//   //   "TCP handshake successfull with " +
//   //     socket.remoteAddress +
//   //     " : " +
//   //     socket.remotePort
//   // );
//   // socket.write("hello client !!");
//   // socket.on("data", (data) => {
//   //   console.log("recieved data " + data.toString());
//   // });
// });

const server = net.createServer((socket) => {
  console.log(
    "TCP handshake successfull with " +
      socket.remoteAddress +
      " : " +
      socket.remotePort
  );
  socket.write("hello client !!");
  socket.on("data", (data) => {
    console.log("recieved data " + data.toString());
  });
});

server.listen(8800, "127.0.0.1");

// ------ client -------
// nc 127.0.0.1 8800
// write your messages after that
