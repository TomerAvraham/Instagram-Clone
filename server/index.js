require("./config/mysql");
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("message", (userMessage) => {
    io.emit("message", userMessage);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/post", require("./routes/post.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/upload", require("./routes/upload.routes"));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
