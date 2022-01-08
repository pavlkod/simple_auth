const User = require("../models/User");
const Role = require("../models/Role");

class AuthController {
  auth(req, res) {
    res.send({ message: "OK" });
  }
  async registration(req, res) {
    try {
      res.send("REG");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
}
module.exports = new AuthController();
