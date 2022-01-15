const authRouter = require("./auth");
const Router = require("express");
const router = new Router();

router.use("/auth", authRouter);

module.exports = router;
