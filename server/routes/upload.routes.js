const router = require("express").Router();
const { v4 } = require("uuid");

router.post("/toPostImages", (req, res) => {
  if (req.files === null) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const file = req.files.file;
  const fileName = v4() + file.name;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/x-icon"
  ) {
    file.mv(`${__dirname}/../../client/public/uploads/postImages/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
      }
    });

    return res.status(200).send({
      filePath: `/uploads/postImages/${fileName}`,
    });
  } else {
    return res.status(400).send({ message: "Image Files Only" });
  }
});

router.post("/toProfileImages", (req, res) => {
  if (req.files === null) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const file = req.files.file;
  const fileName = v4() + file.name;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/x-icon"
  ) {
    file.mv(`${__dirname}/../../client/public/uploads/profileImages/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: err.message });
      }
    });

    return res.status(200).send({
      filePath: `/uploads/profileImages/${fileName}`,
    });
  } else {
    return res.status(400).send({ message: "Image Files Only" });
  }
});

module.exports = router;
