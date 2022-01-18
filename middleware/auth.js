const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User not authorized" });
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error auth" });
  }
};
