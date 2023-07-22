const mongoose = require("mongoose");

// Connect to MongoDB (add MONGODB_URL in your env with actual MongoDB URI)
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// EXPORT
module.exports = mongoose;
