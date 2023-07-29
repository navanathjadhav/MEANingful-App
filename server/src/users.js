const mongoose = require("./database");
const redisClient = require("./redis");

const User = mongoose.model("User", { name: String, email: String });

const getHome = (req, res) => {
  res.send(`<h2>What's added</h2>
  <ul>
      <li>Caching</li>
      <ul>
          <li>Distributed Cache</li>
          <ul>
              <li>Redis</li>
          </ul>
      </ul>
  </ul>`);
};

const getUsers = async (req, res) => {
  // Fetch the users from redis
  const cachedUsers = await redisClient.get("users");
  const users = cachedUsers ? JSON.parse(cachedUsers) : await User.find();
  if (!cachedUsers) {
    // Cache data in Redis for future use
    redisClient.set("users", JSON.stringify(users));
  }
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    $set: { name: req.body.name },
  });
  res.json(user);
};

const removeUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
};

const saveUser = async (req, res) => {
  const newUser = new User({ name: req.body.name, email: req.body.name });
  const savedUser = await newUser.save();

  res.json(savedUser);
};

module.exports = {
  getHome,
  getUsers,
  saveUser,
  getUser,
  removeUser,
  updateUser,
};
