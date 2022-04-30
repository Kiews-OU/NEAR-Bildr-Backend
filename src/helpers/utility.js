/* eslint-disable max-len */
const bcrypt = require("bcrypt");
const shortid = require("shortid");

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
};

module.exports = Utility;
