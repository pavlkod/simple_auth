const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const router = require("./router");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/", router);

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT, () => console.log("Server started"));
  } catch (e) {
    console.log(e);
  }
})();
