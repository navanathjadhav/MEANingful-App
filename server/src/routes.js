const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.send({
    h2: "What's added",
    ul: {
      li: "Web Frameworks",
      ul: {
        li: ["Express.js"],
      },
    },
  });
});

// GET
router.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Navanath Jadhav" },
    { id: 2, name: "Akshay Gudhate" },
  ];
  res.json(users);
});

// GET
router.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

// EXPORT
module.exports = router;
