const tokenService = require("./token.service");
const userService = require("./user.service");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Error("Incorrect email or password");
  }
  return { _id: user._id, name: user.name, email: user.email };
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken
    );
    const user = await userService.getUser(resetPasswordTokenDoc.sub);
    if (!user) {
      throw new Error("Invalid token");
    }
    await userService.updateUser(user._id, { password: newPassword });
  } catch (error) {
    throw new Error(error.message);
  }
};

const verifyResetPassword = async (resetPasswordToken) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken
    );
    const user = await userService.getUser(resetPasswordTokenDoc.sub);
    if (!user) {
      throw new Error("Invalid token");
    }
    return { _id: user._id, email: user.email };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  resetPassword,
  verifyResetPassword,
};
