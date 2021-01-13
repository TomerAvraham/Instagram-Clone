const router = require("express").Router();
const Isemail = require("isemail");
const jwt = require("jsonwebtoken");
const Query = require("../config/mysql");
const bcrypt = require("bcryptjs");
const authRegister = require("../middleware/register.middleware");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    let findUserQuery = "";
    if (Isemail.validate(username)) {
      findUserQuery = "SELECT * FROM users where email = ?";
    } else {
      findUserQuery = `SELECT * FROM users where username = ?`;
    }
    const result = await Query(findUserQuery, username);
    if (!result.length) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    const user = result[0];
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30min",
      });
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "100d",
        }
      );
      res.status(200).send({ accessToken, refreshToken });
    } else {
      res.status(400).send({ message: "Incorrect password " });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something when wrong while login. Please try again." });
  }
});

router.post("/register", authRegister, async (req, res) => {
  try {
    const { email, username, password, profilePhotoUrl } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const addUser_q = `insert into users (username, password, email, profilePhotoUrl) values (?, ?, ?, ?)`;
    await Query(addUser_q, username, hashedPassword, email, profilePhotoUrl);
    res.status(201).send({ message: "User created successfully, login now" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).send({ error: err });
      try {
        const user_q = "SELECT * FROM users where id = ?";
        const result = await Query(user_q, decoded.userId);
        if (!result.length) {
          return res
            .status(403)
            .send({ message: "User doesn't exist any more." });
        }
        const user = result[0];
        delete user.password;
        const accessToken = jwt.sign(
          { user },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30min",
          }
        );

        res.status(200).send({ accessToken });
      } catch (err) {
        res.status(403).send({ error: err });
      }
    }
  );
});

module.exports = router;
