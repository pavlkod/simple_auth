const AuthController = require("../controller/AuthController");
const Router = require("express");
const router = new Router();

router.get("/", AuthController.auth);

module.exports = router;
