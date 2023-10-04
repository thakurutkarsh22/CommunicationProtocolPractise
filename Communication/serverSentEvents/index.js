const app = require("express")();

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
});

const port = process.env.PORT || 8888;
let i = 0;
function send(res) {
  // you have to send "data: {rest of string }" as client percieve message like this only
  res.write("data: " + `hello from server ===== [${i++}] \n\n`);
  setTimeout(() => {
    send(res);
  }, 1000);
}

app.listen(port);
console.log("listining on ", port);

/// ---------------- client code ----------
// let sse = new EventSource("http://localhost:8888/stream")
// sse.onmessage = console.log

// in browser run localhost:8888 and then do the top lines
