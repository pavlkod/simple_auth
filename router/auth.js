const AuthController = require("../controller/AuthController");
const Router = require("express");
const router = new Router();

const { check } = require("express-validator");

router.get("/", AuthController.auth);
router.post(
  "/registration",
  [
    check("username", "Username is required"),
    check("password", "Minimum 4 symbols max 10").isLength({ min: 4, max: 10 }),
  ],
  AuthController.registration
);

module.exports = router;
