const AuthController = require("../controller/AuthController");
const Router = require("express");
const router = new Router();

const { check } = require("express-validator");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, AuthController.getUsers);
router.post(
  "/registration",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Minimum 4 symbols max 10").isLength({ min: 4, max: 10 }),
  ],
  AuthController.registration
);
router.post(
  "/login",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Minimum 4 symbols max 10").isLength({ min: 4, max: 10 }),
  ],
  AuthController.login
);

module.exports = router;
