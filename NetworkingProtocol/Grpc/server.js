const grpc = require("grpc");

// This will basically convert the grpc code to my javascript client.
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("todo.proto", {});

//  GOAL is to load todo.proto (todoPackage) into javascript object
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

// grpc by default uses HTTP2 which needs to be secured so grpc provides the way to connect insecurly as well
// this is just a hack to create things on the server side.
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});

server.start();

const todos = [];

// Methods in grpc always takes 2 params
// call -> whole call (tcp cennection etc)
// callback -> use to send back response to the client
function createTodo(call, callback) {
  console.log(call);
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(todoItem);
  callback(null, todoItem);
}

function readTodos(call, callback) {
  callback(null, { items: todos });
}

function readTodosStream(call, callback) {
  todos.forEach((t) => call.write(t));
  call.end();
}
