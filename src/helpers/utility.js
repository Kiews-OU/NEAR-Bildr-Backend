/* eslint-disable max-len */
const bcrypt = require("bcrypt");
const path = require("path");
const shortid = require("shortid");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const logger = require("./logger.helper");

require("dotenv").config();

const Utility = {
  hashPassword: (plainPassword) =>
    bcrypt.hashSync(plainPassword, Number(process.env.BCRYPT_HASH_ROUND)),
  comparePassword: (plainPassword, encryptedPassword) =>
    bcrypt.compareSync(plainPassword, encryptedPassword),
  separateLetterAndNumber: (str) => {
    const pattern1 = /[0-9]/g;
    const pattern2 = /[a-zA-Z]/g;

    const digits = str.match(pattern1);
    const letters = str.match(pattern2);
    return {
      digits: digits.toString().replaceAll(",", ""),
      letters: letters.toString().replaceAll(",", ""),
    };
  },
  slugify: (string) =>
    string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, ""),
  generatePassword: () => shortid.generate(),
  sendEmail: (subject, view, email, context) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./src/emails/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/emails/"),
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: '"NEAR Learning Community Platform" <info@shegermart.com>',
      to: email,
      subject,
      template: view,
      context,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return logger.error(error);
      }
      return logger.info(`Message sent: ${info.response}`);
    });
  },
};

module.exports = Utility;
