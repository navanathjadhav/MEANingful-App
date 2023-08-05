const { authService, userService, tokenService } = require("../services");

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

module.exports = {
  register,
  login,
  self,
};
