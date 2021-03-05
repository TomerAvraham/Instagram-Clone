const Query = require("../config/mysql");
const Isemail = require("isemail");

const authRegister = async (req, res, next) => {
  try {
    const {
      email,
      username,
      password,
      confirmPassword,
      profilePhotoUrl,
    } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is require" });
    }
    if (!Isemail.validate(email)) {
      return res.status(400).send({ message: "Email is not valid" });
    }
    if (!profilePhotoUrl) {
      return res.status(400).send({ message: "Gender is require" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is require" });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords does not match" });
    }
    if (password.length < 6) {
      return res.status(400).send({ message: "Password need at least 6 characters" });
    }

    const validUserName_q = `SELECT username FROM users WHERE username = ?`;
    const userExist = await Query(validUserName_q, username);
    if (userExist.length) {
      return res.status(409).send({ message: "Username already exist" });
    }
    const validEmail_q = `SELECT email from users WHERE email = ?`;
    const emailExist = await Query(validEmail_q, email);
    if (emailExist.length) {
      return res.status(409).send({ message: "Email already exist" });
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ message: "Something want wrong. Try again later" });
  }
  next();
};

module.exports = authRegister;
