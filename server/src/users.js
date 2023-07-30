const mongoose = require("./database");
const redisClient = require("./redis");

const User = mongoose.model("User", { name: String, email: String });

const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "API Clients",
      li2: {
        ul: {
          li1: "REST",
          ul: {
            li1: "Axios"
          }
        },
      },
    },
  };

  // Render the template with the dynamic data
  res.render("index", data);
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
