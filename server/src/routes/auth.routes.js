const express = require("express");
const { saveUser } = require("../controllers/users.controller");
const {
  login,
  self,
  forgotPassword,
  resetPassword,
  verifyResetPassword,
} = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

/* ==================================================== */
/* ========================AUTH======================== */
/* ==================================================== */
router.post("/signup", saveUser);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/reset-password", verifyResetPassword);
router.get("/self", auth, self);

// EXPORT
module.exports = router;
