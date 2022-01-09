const AuthController = require("../controller/AuthController");
const Router = require("express");
const router = new Router();

router.get("/", AuthController.auth);
router.post("/registration", AuthController.registration);

module.exports = router;
