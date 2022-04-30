const jwt = require("jsonwebtoken");

const { JWT_SECRET, REFRESH_TOKEN_LIFETIME, ACCESS_TOKEN_LIFETIME } =
  process.env;

require("dotenv").config();

const JwtHelper = {
  GenerateAccessToken: (user) =>
    jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFETIME,
    }),
  GenerateRefreshToken: (user) =>
    jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_LIFETIME,
    }),
  ExpireToken: () =>
    jwt.sign(
      {
        userId: "",
        role: "",
      },
      JWT_SECRET,
      {
        expiresIn: "1",
      }
    ),
  GetJwtPayload: async (req) => {
    const authorizationHeader = req.headers.authorization;
    const [, ...rest] = authorizationHeader.split(" ");
    const token = rest[0];
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw Error(err);
    }
  },
  VerifyJwtToken: async (token) => {
    try {
      const verifyToken = jwt.verify(token, JWT_SECRET);
      if (verifyToken) {
        return verifyToken;
      }
      return false;
    } catch (err) {
      throw Error(err);
    }
  },
};

module.exports = JwtHelper;
