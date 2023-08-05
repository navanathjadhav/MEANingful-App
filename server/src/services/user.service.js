const redisClient = require("../config/redis");
const User = require("../models/user.model");

const getUsers = async () => {
  // Fetch the users from redis
  const cachedUsers = await redisClient.get("users");
  const users = cachedUsers ? JSON.parse(cachedUsers) : await User.find();
  if (!cachedUsers) {
    // Cache data in Redis for future use
    redisClient.set("users", JSON.stringify(users));
  }
  return users;
};

const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const updateUser = async (userId, payload) => {
  const user = await User.findByIdAndUpdate(userId, {
    $set: { ...payload },
  });
  return user;
};

const removeUser = async (userId) => {
  await User.findByIdAndRemove(userId);
  return;
};

const saveUser = async (payload) => {
  const newUser = new User({ name: payload.name, email: payload.name });
  const savedUser = await newUser.save();
  return savedUser;
};

module.exports = {
  getUsers,
  saveUser,
  getUser,
  removeUser,
  updateUser,
};
