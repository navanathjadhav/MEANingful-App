const express = require("express");
const {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  removeUser,
} = require("../controllers/users.controller");
const router = express.Router();

/* ==================================================== */
/* =======================USERS======================== */
/* ==================================================== */
router.get("/", getUsers);
router.post("/", saveUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", removeUser);

// EXPORT
module.exports = router;
