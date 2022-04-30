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
  ChangePassword: async (req, res) => {
    try {
      const { current_password: currentPassword, new_password: newPassword } =
        req.body;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const currentUser = await UserService.GetUser(userId);
      if (Utility.comparePassword(currentPassword, currentUser.password)) {
        const user = await UserService.UpdatePassword(newPassword, userId);
        if (!user) {
          return res
            .status(500)
            .json({ err: "Something went wrong", status: false });
        }
        return res.status(200).json({
          message: "Password changed successfully",
          status: true,
        });
      }
      return res
        .status(400)
        .json({ err: "Incorrect current password", status: false });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ err, status: false });
    }
  },
  ResetPassword: async (req, res) => {
    try {
      const {
        email,
        new_password: newPassword,
        verify_code: verifyCode,
      } = req.body;
      const user = await UserService.GetUserByEmail(email);
      if (user) {
        if (verifyCode) {
          const sessionVerificationCode = req.session.verification_code;
          if (sessionVerificationCode) {
            const [first, ...rest] = sessionVerificationCode.split("-");
            if (first === email && rest[0] === verifyCode) {
              await UserService.UpdatePassword(newPassword, user.id);
              return res.status(200).json({
                message: "Password changed successfully",
                status: true,
              });
            }
            return res
              .status(400)
              .json({ err: "Invalid verification code", status: false });
          }
          return res
            .status(400)
            .json({ err: "Invalid verification code", status: false });
        }
        const verificationCode = Math.floor(Math.random() * 1000000 + 1);
        req.session.verification_code = `${email}-${verificationCode}`;
        await Utility.sendEmail(
          "Please confirm your email",
          "send-confirmation-code-rest-password.email",
          email,
          {
            first_name: user.first_name,
            verification_code: verificationCode,
          }
        );
        return res.status(200).json({
          message:
            "We sent confirmation code to your email please check your inbox",
          status: true,
        });
      }
      return res.status(404).json({ err: "User not found", status: false });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ err, status: false });
    }
  },
};

module.exports = AuthController;
