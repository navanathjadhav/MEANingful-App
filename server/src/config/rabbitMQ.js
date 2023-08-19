/* Imports */
const amqp = require("amqplib");
const { consumeQueueAndSendEmails } = require("./email.queue");
const logger = require("./logger");

/* Globals */
let connection;
let channel;
let queue;

async function initQueue(name) {
  queue = name;
  connection = await amqp.connect(process.env.RABBIT_MQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(name, { durable: false });
  logger.info(`[RABBIT_MQ]: Queue was initialized`);
  return undefined;
}

async function publishMessage(queueName, message) {
  if (!connection) await initQueue(queueName);
  await channel.sendToQueue(queueName, Buffer.from(message));
  logger.info(`Message was published`);
  /* Consume queue and send emails */
  consumeQueueAndSendEmails(queue, channel);
  return undefined;
}

module.exports = {
  initQueue,
  publishMessage,
};
