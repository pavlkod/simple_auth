class AuthController {
  auth(req, res) {
    res.send({ message: "OK" });
  }
  async registration(req, res) {
    try {
      res.send("REG");
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new AuthController();
