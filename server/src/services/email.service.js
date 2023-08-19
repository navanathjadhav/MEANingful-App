const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const logger = require("../config/logger");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/* ignore next */
if (process.env.NODE_ENV === "production") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

const sendEmail = async (to, subject, text) => {
  if (process.env.NODE_ENV !== "production") return;
  const msg = { from: process.env.EMAIL_FROM, to, subject, text };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (data) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${process.env.SITE_URL}/auth/reset-password?token=${data.token}`;
  logger.info(`[RESET_PWD]: ${resetPasswordUrl}`);
  const text = `Dear user,
  To reset your password, click on this link: {{resetPasswordUrl}}
  If you did not request any password resets, then ignore this email.`;
  const template = Handlebars.compile(text);
  await sendEmail(data.to, subject, template({ resetPasswordUrl }));
  return undefined;
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
};
