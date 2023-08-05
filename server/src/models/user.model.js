const mongoose = require("../config/database");

const User = mongoose.model("User", { name: String, email: String });

module.exports = User;
