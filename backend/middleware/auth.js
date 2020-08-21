const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: "Invalid Token" });
  }
};