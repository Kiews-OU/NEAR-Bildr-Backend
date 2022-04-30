const UserService = require("../services/user.service");
const Utility = require("../helpers/utility");
const JwtHelper = require("../helpers/jwt.helper");
const logger = require("../helpers/logger.helper");

const AuthController = {
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.GetUserByEmail(email);
      if (!user) {
        return res
          .status(400)
          .json({ err: "Wrong email or password", status: false });
      }
      if (user.is_active === false) {
        return res.status(400).json({
          err: "Your account is deactivated, please contact us for more information",
          status: false,
        });
      }
      if (!Utility.comparePassword(password, user.password)) {
        return res
          .status(401)
          .json({ err: "Wrong email or password", status: false });
      }
      const accessToken = JwtHelper.GenerateAccessToken(user);
      const refreshToken = JwtHelper.GenerateRefreshToken(user);

      const cookieExpiresDate = new Date();
      cookieExpiresDate.setTime(
        cookieExpiresDate.getTime() +
          Number(process.env.COOKIE_LIFETIME_IN_DAYS) * 24 * 60 * 60 * 1000
      );

      const accessTokenExpiresDate = new Date();

      const { digits: accessTokenLifeTime } =
        await Utility.separateLetterAndNumber(
          process.env.ACCESS_TOKEN_LIFETIME
        );

      accessTokenExpiresDate.setTime(
        accessTokenExpiresDate.getTime() +
          (accessTokenLifeTime / 24) * 60 * 1000
      );
      return res
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          path: "/",
          expires: cookieExpiresDate,
          sameSite: "strict",
        })
        .json({
          data: {
            token: { expires: accessTokenExpiresDate, value: accessToken },
            user,
          },
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

module.exports = AuthController;
