const jwt = require("jsonwebtoken");
const moment = require("moment");
const userService = require("./user.service");

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

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new Error("No users found with this email");
  }
  const resetPasswordToken = generateToken(
    user._id,
    process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES
  );
  return resetPasswordToken;
};

module.exports = {
  generateToken,
  verifyToken,
  generateResetPasswordToken,
};
