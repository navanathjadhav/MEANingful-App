const express = require("express");
const {
  getUsers,
  getHome,
  getUser,
  saveUser,
  updateUser,
  removeUser,
} = require("./users");
const { getSpaceXShips } = require("./launches");
const router = express.Router();

/* ==================================================== */
/* =======================HOME======================== */
/* ==================================================== */
router.get("/", getHome);

/* ==================================================== */
/* =======================USERS======================== */
/* ==================================================== */
router.get("/users", getUsers);
router.post("/users", saveUser);
router.get("/users/:id", getUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", removeUser);

/* ==================================================== */
/* =======================SHIPS======================== */
/* ==================================================== */
router.get("/ships", getSpaceXShips);

// EXPORT
module.exports = router;
