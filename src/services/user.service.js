const logger = require("../helpers/logger.helper");
const { hashPassword } = require("../helpers/utility");
const { User } = require("../models");

const UserService = {
  CreateUser: async (userAttribute) => {
    try {
      const user = new User({
        first_name: userAttribute.first_name,
        last_name: userAttribute.last_name,
        email: userAttribute.email,
        password: hashPassword(userAttribute.password),
        gender: userAttribute.gender,
        role: userAttribute.role,
        profile_image: userAttribute.profile_image,
        phone_number: userAttribute.phone_number,
      });
      return await user.save();
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
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
