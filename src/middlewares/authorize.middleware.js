const logger = require("../helpers/logger.helper");
const UserService = require("../services/user.service");

const Authorize = (roles) => async (req, res, next) => {
  const { userId } = res.jwtPayload;
  try {
    const user = await UserService.GetUser(userId);
    const userRole = user.role;
    if (roles.indexOf(userRole) > -1) {
      next();
    } else {
      res.status(401).send();
      res.end();
    }
  } catch (err) {
    logger.error(err);
    res.status(401).send();
    res.end();
  }
};
module.exports = Authorize;
