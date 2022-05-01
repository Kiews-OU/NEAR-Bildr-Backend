const UserService = require("../services/user.service");
const JwtHelper = require("../helpers/jwt.helper");
const logger = require("../helpers/logger.helper");

const UserController = {
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
