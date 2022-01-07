const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const express = require("express");
const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT, () => console.log("Server started"));
  } catch (e) {
    console.log(e);
  }
})();
