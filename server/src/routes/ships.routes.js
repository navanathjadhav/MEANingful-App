const express = require("express");
const { getSpaceXShips } = require("../controllers/launches.controller");
const router = express.Router();

/* ==================================================== */
/* =======================SHIPS======================== */
/* ==================================================== */
router.get("/", getSpaceXShips);

// EXPORT
module.exports = router;
