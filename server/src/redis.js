const redis = require("redis");
const logger = require("./logger");

// Connect to Redis Server (add REDIS_HOST & REDIS_PORT in your env with actual Redis Host & Port)
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Connect to redis server
redisClient.connect();

// Handle connection success
redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

// Handle connection error
redisClient.on("error", (err) => {
  logger.error("Redis Error:", err);
});

// EXPORT
module.exports = redisClient;
