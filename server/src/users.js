const mongoose = require("./database");

const User = mongoose.model("User", { name: String, email: String });

const getHome = (req, res) => {
  res.send(`<h2>What's added</h2>
  <ul>
      <li>Databases</li>
      <ul>
          <li>NoSQL</li>
          <ul>
              <li>MongoDB</li>
          </ul>
      </ul>
  </ul>`);
};

const getUsers = async (req, res) => {
  const users = await User.find();
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
