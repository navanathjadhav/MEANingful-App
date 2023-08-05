const express = require("express");
const { getHome } = require("../controllers/home.controller");
const router = express.Router();

/* ==================================================== */
/* =======================HOME======================== */
/* ==================================================== */
router.get("/", getHome);

// EXPORT
module.exports = router;
