const logger = require("./logger");

const activeUsers = [];
let io;
// This function adds a user ID to the list of active users.
function addToActiveUsers(id) {
  // Check if the user ID is already in the list of active users.
  if (activeUsers.includes(id)) {
    // If the user ID is already in the list, don't add it again.
    return;
  }
  // If the user ID is not already in the list, add it to the end of the array.
  activeUsers.push(id);
}

// This function removes a user ID from the list of active users.
function removeFromActiveUsers(id) {
  // Find the index of the user ID in the array of active users.
  const index = activeUsers.findIndex((i) => i === id);
  // If the user ID is not in the list of active users, return early.
  if (index === -1) {
    return;
  }
  // If the user ID is in the list of active users, remove it from the array.
  activeUsers.splice(index, 1);
}

// This function creates a Socket.IO connection using the specified server.
function createSocketConnection(server) {
  // Create a new Socket.IO instance and configure it with CORS options.
  // eslint-disable-next-line no-undef, global-require
  io = require("socket.io")(server, {
    cors: {
      origin: process.env.SITE_URL,
      // credentials: true,
    },
  });

  // Listen for a connection event from a client.
  io.on("connection", async (socket) => {
    logger.info("Connected to Socket.io");

    // Listen for a joinRoom event from the client and join the specified room.
    socket.on("joinRoom", (userId) => {
      logger.info(`[ROOM]: User is joined to room => ${userId}`);
      socket.join("loggedInUsers");
      addToActiveUsers(userId);
      io.sockets.emit("updateCurrentUserCount", {
        activeUserCount: activeUsers.length,
      });
    });

    // Listen for a leaveRoom event from the client and leave the specified room.
    socket.on("leaveRoom", (userId) => {
      socket.leave("loggedInUsers");
      logger.info(`[ROOM]: User has left the room => ${userId}`);
      removeFromActiveUsers(userId);
      io.sockets.emit("updateCurrentUserCount", {
        activeUserCount: activeUsers.length,
      });
    });

    // Listen for a disconnect event from the client and perform cleanup.
    socket.on("disconnect", function () {
      logger.info("Client disconnected");
      socket.removeAllListeners("disconnect");
      socket.removeAllListeners("updateCurrentUserCount");
      socket.removeAllListeners("connection");
      socket.leaveAll();
    });
  });
}

// Emit drink water reminder to client
function emitRemindToDrinkWater() {
  io.sockets.emit("drinkWaterReminder", true);
}

module.exports = {
  createSocketConnection,
  emitRemindToDrinkWater,
};
