const express = require("express");
const {
  getUsers,
  getHome,
  getUser,
  saveUser,
  updateUser,
  removeUser,
} = require("./users");
const router = express.Router();

// GET
router.get("/", getHome);

// GET
router.get("/users", getUsers);

// POST
router.post("/users", saveUser);

// GET
router.get("/users/:id", getUser);

// PATCH
router.patch("/users/:id", updateUser);

// DELETE
router.delete("/users/:id", removeUser);

// GET
router.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

// EXPORT
module.exports = router;
