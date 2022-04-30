const logger = require("../helpers/logger.helper");
const { hashPassword } = require("../helpers/utility");
const { User } = require("../models");

const UserService = {
  GetUser: async (userId) => {
    try {
      const filter = { id: userId };
      const user = await User.findOne({ where: filter });
      return user;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetUserByEmail: async (email) => {
    try {
      const filter = { email };
      const user = await User.findOne({ where: filter });
      return user;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  UpdatePassword: async (newPassword, userId) => {
    try {
      const filter = { id: userId };
      const update = { password: hashPassword(newPassword) };
      const user = await User.update(update, {
        where: filter,
      });
      return user;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = UserService;
