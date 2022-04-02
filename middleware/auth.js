const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("token is missing");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(decode);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
};

module.exports = auth;
