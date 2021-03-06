require("./config/mysql");
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  reconnection: false,
});

let usersCounter = 0;

io.on("connect", (socket) => {
  console.log("user connected");

  usersCounter++;
  io.emit("usersCount", usersCounter);

  socket.on("message", (userMessage) => {
    io.emit("message", userMessage);
  });

  socket.on("user typing", (username) => {
    io.emit("show user typing", username);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    usersCounter--;
    io.emit("usersCount", usersCounter);
  });
});

app.use("/upload", express.static("upload"));

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/post", require("./routes/post.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
