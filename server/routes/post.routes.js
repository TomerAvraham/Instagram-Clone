const router = require("express").Router();
const Query = require("../config/mysql");
const authJwt = require("../middleware/jwt.middleware");

router.post("/add", authJwt, async (req, res) => {
  try {
    console.log(req.user.id);
    const { url } = req.body;
    const newPost_q = `insert into posts (userId, url) 
        values (?, ?)`;
    await Query(newPost_q, req.user.id, url);
    res.status(201).send({ message: "newPostCreated" });
  } catch (error) {
    res.status(500).send({ message: "Something want wrong. Try again later." });
  }
});

module.exports = router;
