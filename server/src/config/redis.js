const redis = require("redis");
const logger = require("./logger");

class RedisClient {
  redisClient;
  constructor() {
    // Connect to Redis Server (add REDIS_HOST & REDIS_PORT in your env with actual Redis Host & Port)
    this.redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });

    this.handleConnection();
  }

  handleConnection = function () {
    // Connect to redis server
    this.redisClient.connect();

    // Handle connection success
    this.redisClient.on("connect", () => {
      logger.info("Connected to Redis");
    });

    // Handle connection error
    this.redisClient.on("error", (err) => {
      logger.error("Redis Error:", err);
    });
  };
}

// Added a get method to the RedisClient prototype
RedisClient.prototype.get = function (item) {
  return this.redisClient.get(item);
};

// Added a set method to the RedisClient prototype
RedisClient.prototype.set = function (item, data) {
  return this.redisClient.set(item, data);
};

// EXPORT
module.exports = new RedisClient();
