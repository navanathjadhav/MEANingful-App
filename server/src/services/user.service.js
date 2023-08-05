const User = require("../models/user.model");

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const updateUser = async (userId, payload) => {
  const user = await getUser(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (payload.email && (await User.isEmailTaken(payload.email, userId))) {
    throw new Error("Email already taken");
  }
  Object.assign(user, payload);
  await user.save();
  return user;
};

const removeUser = async (userId) => {
  await User.findByIdAndRemove(userId);
  return;
};

const saveUser = async (payload) => {
  if (await User.isEmailTaken(payload.email)) {
    throw new Error("Email already taken");
  }
  return User.create({
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

module.exports = {
  getUsers,
  saveUser,
  getUser,
  removeUser,
  updateUser,
  getUserByEmail,
};
