/* Imports */
const amqp = require("amqplib");
const logger = require("./logger");
const EmailQueue = require("./email.queue");

class MessageQueue extends EmailQueue {
  async initQueue(name) {
    this.queue = name;
    this.connection = await amqp.connect(process.env.RABBIT_MQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(name, { durable: false });
    logger.info(`[RABBIT_MQ]: Queue was initialized`);
    return undefined;
  }

  async publishMessage(queueName, message) {
    if (!this.connection) await this.initQueue(queueName);
    await this.channel.sendToQueue(queueName, Buffer.from(message));
    logger.info(`Message was published`);
    /* Consume queue and send emails */
    this.consumeQueueAndSendEmails(this.queue, this.channel);
    return undefined;
  }
}

module.exports = MessageQueue;
