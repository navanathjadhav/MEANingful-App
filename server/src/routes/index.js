const express = require("express");
const usersRoute = require("./users.routes");
const shipsRoute = require("./ships.routes");
const homeRoute = require("./home.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/ships",
    route: shipsRoute,
  },
  {
    path: "/",
    route: homeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
