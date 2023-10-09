const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (error, response) => {
    console.log("recieved from server1", JSON.stringify(response));
  }
);

client.readTodos({}, (error, response) => {
  console.log("recieved from server2", JSON.stringify(response));
  response?.items.forEach((a) => console.log(a.text));
});

const call = client.readTodosStream();
call.on("data", (item) => {
  console.log("recieved item from server 3" + JSON.stringify(item));
});

call.on("end", (e) => console.log("server done"));
