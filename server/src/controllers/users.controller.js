const { userService } = require("../services");

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
            li1: "Axios",
          },
        },
      },
    },
  };

  // Render the template with the dynamic data
  res.render("index", data);
};

const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, {
    name: req.body.name,
  });
  res.json(user);
};

const removeUser = async (req, res) => {
  await userService.removeUser(req.params.id);
  res.sendStatus(204);
};

const saveUser = async (req, res) => {
  const newUser = await userService.saveUser({
    name: req.body.name,
    email: req.body.name,
  });

  res.json(newUser);
};

module.exports = {
  getHome,
  getUsers,
  saveUser,
  getUser,
  removeUser,
  updateUser,
};
