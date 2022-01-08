class AuthController {
  auth(req, res) {
    res.send({ message: "OK" });
  }
}
module.exports = new AuthController();
