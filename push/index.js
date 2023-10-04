const http = require("http");
const WebSocketServer = require("websocket").server;

let connections = [];

const httpServer = http.createServer();

const websocket = new WebSocketServer({ httpServer: httpServer });

httpServer.listen(8080, () => console.log("listing on the server port 8080"));

// when a websocket request comes and listen to it and get the conection

websocket.on("request", (request) => {
  // we have to accept the incoming connection and that create its own instance
  const connection = request.accept(null, request.origin);
  // now if someone sends some message form this connection then take all the users from the conecton pool and message them

  connection.on("message", (message) => {
    connections.forEach((c) =>
      c.send(`User ${connection.socket.remotePort} says ${message.utf8Data}`)
    );
  });

  connections.push(connection);
  // someone just connected just ping in the group

  connections.forEach((c) =>
    c.send(`User ${connection.socket.remotePort} just joined`)
  );
});

/// ---------------- client code ------------------
// this can be run on the different browser window

// let ws = new WebSocket("ws://localhost:8080")
// ws.onmessage = message => console.log(`Recieved: ${message.data}`)
// ws.send("hey there")
