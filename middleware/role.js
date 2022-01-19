const jwt = require("jsonwebtoken");
module.exports = roles => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User not authorized" });
      }
      const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY);
      if (!roles.some(role => userRoles.includes(role))) {
        res.status(403).json({ message: "No user right" });
      }
      next();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Error auth" });
    }
  };
};
