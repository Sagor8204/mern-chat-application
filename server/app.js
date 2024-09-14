require("dotenv").config({ path: "./config.env" });
const express = require("express");
require("./db/connection");
const routers = require("./routers/router");
const cookieParser = require("cookie-parser");
const http = require("http");
const chatRoute = require("./routers/chatRouter");
const messageRoute = require("./routers/messageRouter");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
const server = http.createServer(app);

// server listen
server.listen(PORT, () => {
  console.log(`Server running port no: ${PORT}`);
});

// routing setup
app.use("/", routers);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecevied) => {
    let chat = newMessageRecevied.chat;

    if (!chat.users) return console.log("chat.users not define!");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecevied.sender._id) return;

      socket.in(user._id).emit("message recived", newMessageRecevied);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected!");
    socket.leave(userData._id);
  });
});
