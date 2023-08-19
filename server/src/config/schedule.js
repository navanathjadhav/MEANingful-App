const schedule = require('node-schedule');
const logger = require('./logger');
const { emitRemindToDrinkWater } = require('./socket');

// Define a function to remind users to drink water during day time
function remindToDrinkWater() {
  // Check if it's currently day time
  const now = new Date();
  const hour = now.getHours();
  const isDayTime = hour >= 6 && hour <= 18; // assuming day time is from 6AM to 6PM

  if (isDayTime) {
    // If it's day time, remind the user to drink water by emitting 'drinkWaterReminder' event to all connected sockets
    logger.info('Drink Water');
    emitRemindToDrinkWater();
  }
}

// Use node-schedule to schedule the reminder function to run every 45 minutes
// The function will be triggered on every 45th minute of every hour
// For example, 1:45PM, 2:45PM, 3:45PM, etc.
schedule.scheduleJob('*/45 * * * *', function () {
  remindToDrinkWater();
});
