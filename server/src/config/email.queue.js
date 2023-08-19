/* Imports */
const { sendResetPasswordEmail } = require("../services/email.service");
const logger = require("./logger");

async function consumeQueueAndSendEmails(queue, channel) {
  if (!queue || !channel) return;

  /* Subscribe */
  channel.consume(queue, (message) => {
    logger.info(`Message was received`);
    const parsedMessage = JSON.parse(message.content.toString());
    channel.ack(message); // Acknowledge message as received

    /* Perform actions as per operation */
    const operationMapper = {
      sendResetPasswordEmail: async () => {
        await sendResetPasswordEmail(parsedMessage.data);
      },
      default: () => {
        throw new Error(`Invalid operation: ${parsedMessage.operation}`);
      },
    };

    parsedMessage.operation in operationMapper
      ? operationMapper[parsedMessage.operation]()
      : operationMapper.default();
  });

  return undefined;
}

module.exports = {
  consumeQueueAndSendEmails,
};
