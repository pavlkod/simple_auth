const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class AuthController {
  auth(req, res) {
    res.send({ message: "OK" });
  }
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const userRole = await Role.findOne({ value: "USER" });
      const user = await User.create({ username, password: passwordHash, roles: [userRole.value] });
      res.send(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} doesn't exists` });
      }
      const validatePassword = bcrypt.compareSync(password, user.password);
      if (!validatePassword) {
        return res.status(400).json({ message: `Wrong password` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json(token);
    } catch (e) {
      res.status(400).json({ message: "Login error" });
    }
  }
}
module.exports = new AuthController();
