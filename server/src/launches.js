const redisClient = require("./redis");
const axios = require("axios"); // Require Axios

const getSpaceXShips = async (req, res) => {
  // Fetch the ships from redis
  const cachedShips = await redisClient.get("ships");

  // Fetch ships from API if not found in Redis cache
  const ships = cachedShips
    ? JSON.parse(cachedShips)
    : await axios.get(process.env.SPACEX_API_URL); // Make an HTTP GET request to an external API using Axios

  // Store ships in cache
  if (!cachedShips) {
    // Cache data in Redis for future use
    redisClient.set("ships", JSON.stringify(ships.data));
  }
  res.json((ships && ships.data) || ships || undefined);
};

// Exports
module.exports = {
  getSpaceXShips,
};
