const { userService } = require("../services");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, {
      name: req.body.name,
    });
    res.json(user);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    await userService.removeUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const saveUser = async (req, res) => {
  try {
    const newUser = await userService.saveUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  saveUser,
  getUser,
  removeUser,
  updateUser,
};
