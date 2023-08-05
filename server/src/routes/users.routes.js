const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  removeUser,
} = require("../controllers/users.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

/* ==================================================== */
/* =======================USERS======================== */
/* ==================================================== */
router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, removeUser);

// EXPORT
module.exports = router;
