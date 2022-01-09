const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

class AuthController {
  auth(req, res) {
    res.send({ message: "OK" });
  }
  async registration(req, res) {
    try {
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
}
module.exports = new AuthController();
