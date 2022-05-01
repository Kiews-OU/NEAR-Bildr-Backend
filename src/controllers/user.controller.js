const UserService = require("../services/user.service");
const JwtHelper = require("../helpers/jwt.helper");
const logger = require("../helpers/logger.helper");

const UserController = {
  GetUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserService.GetUser(userId);
      if (!user) {
        return res.status(404).json({ err: "User not found", status: false });
      }
      return res.status(200).json({ data: { user }, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  UpdateProfile: async (req, res) => {
    try {
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const userObj = req.body;
      const updatedUser = await UserService.UpdateProfile(userObj, userId);
      if (!updatedUser) {
        return res
          .status(500)
          .json({ err: "Something went wrong", status: false });
      }
      return res.status(200).json({
        data: { user: updatedUser },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
};

module.exports = UserController;
