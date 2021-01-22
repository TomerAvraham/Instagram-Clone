require("./config/mysql");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/post", require("./routes/post.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/upload", require("./routes/upload.routes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
