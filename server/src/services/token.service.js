const jwt = require("jsonwebtoken");
const moment = require("moment");

const generateToken = (userId, expires, secret = process.env.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
  };
  return jwt.sign(payload, secret, { expiresIn: expires });
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = {
  generateToken,
  verifyToken,
};
