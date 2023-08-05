const express = require("express");
const { saveUser } = require("../controllers/users.controller");
const { login, self } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

/* ==================================================== */
/* ========================AUTH======================== */
/* ==================================================== */
router.post("/signup", saveUser);
router.post("/login", login);
router.get("/self", auth, self);

// EXPORT
module.exports = router;
