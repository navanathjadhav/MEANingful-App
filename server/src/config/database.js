const mongoose = require("mongoose");
const logger = require("./logger");

// Connect to MongoDB (add MONGODB_URL in your env with actual MongoDB URI)
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error connecting to MongoDB:", err));

// EXPORT
module.exports = mongoose;
