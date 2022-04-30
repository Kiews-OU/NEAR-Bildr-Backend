const logger = require("../helpers/logger.helper");
const { User } = require("../models");

const UserService = {
  GetUserByEmail: async (email) => {
    try {
      const filter = { email };
      const user = await User.findOne({ where: filter });
      console.log(user);
      return user;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = UserService;
