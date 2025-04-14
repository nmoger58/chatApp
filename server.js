const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.static("public"));
let users = new Set();
app.get("/", (req, res) => {
  res.send(users);
});
let name = null;
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join", (username) => {
    name = username;
    users.add(username);
    console.log(username + " has been joined");
    socket.broadcast.emit("userJoin", username + " has been joined");
    socket.emit("listUsers", Array.from(users));
  });
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("message", { message, name });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("userLeft", name + " has left the chat");
    users.delete(name);
    console.log("user disconnected id :", name);
  });
});
server.listen(3000);
