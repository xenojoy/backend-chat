const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.username = username;
    io.emit("message", {
      user: "System",
      text: `${username} joined the chat`
    });
  });

  socket.on("message", (msg) => {
    io.emit("message", {
      user: socket.username,
      text: msg
    });
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

