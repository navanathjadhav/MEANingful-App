const { authService, userService, tokenService } = require("../services");
const logger = require("../config/logger");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = await tokenService.generateToken(
      user._id,
      process.env.JWT_ACCESS_EXPIRATION_HOURS
    );
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const token = await tokenService.generateToken(
      user._id,
      process.env.JWT_ACCESS_EXPIRATION_HOURS
    );
    res.send({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const self = async (req, res) => {
  res.status(200).send(req.user);
};

const forgotPassword = async (req, res) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      req.body.email
    );
    const resetPasswordUrl = `${process.env.SITE_URL}/auth/reset-password?token=${resetPasswordToken}`;
    logger.info(`[RESET_PWD]: ${resetPasswordUrl}`);

    res.status(201).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(201).send();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const verifyResetPassword = async (req, res) => {
  try {
    await authService.verifyResetPassword(req.query.token);
    res.status(200).send({ verified: true });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  self,
  forgotPassword,
  resetPassword,
  verifyResetPassword,
};
