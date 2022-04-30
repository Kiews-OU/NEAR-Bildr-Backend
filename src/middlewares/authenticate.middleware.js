const jwt = require("jsonwebtoken");
require("dotenv").config();

const logger = require("../helpers/logger.helper");

const jwtSecret = process.env.JWT_SECRET;

const Authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const [, ...rest] = authorizationHeader.split(" ");
    const token = rest[0];
    let jwtPayload;
    if (!token) {
      return res.status(403).json({ message: "Authorization token required" });
    }
    try {
      jwtPayload = jwt.verify(token, jwtSecret);
      res.jwtPayload = jwtPayload;
      return next();
    } catch (error) {
      logger.error(error);
      // If token is not valid, respond with 401 (unauthorized)
      return res.status(401).json({ message: "unauthorized" });
    }
  } else {
    return res.status(403).json({ message: "Authorization token required" });
  }
};
module.exports = Authenticate;
