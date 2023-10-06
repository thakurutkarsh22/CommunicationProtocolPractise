const http = require("http");
const WebSocketServer = require("websocket").server;

let connections = [];

// Creating raw http server (this will help to create the TCP which will pass to the websocket)
const httpServer = http.createServer();

// pass the httpserver object to the webSocket Server library to do all the job
const websocket = new WebSocketServer({ httpServer: httpServer });

// listen to TCP POrt "127.0.0.1",
httpServer.listen(8083, () => console.log("My server is listng on port 8080"));

websocket.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    connections.forEach(
      (c) =>
        c.connected &&
        c.send(`User${connection.socket.remotePort} says ${message.utf8Data}`)
    );
  });
  connections.push(connection);
  // someone just connected now tell everyone just like in a chat room

  connections.forEach((c) =>
    c.send(`User${connection.socket.remotePort} just joined`)
  );
});

// --------------- client code ----------------

// let ws = new WebSocket("ws://localhost:8080")
// ws.onmessage = message => console.log(`Recieved: ${message.data}`)
// ws.send("hello! there I am client")
