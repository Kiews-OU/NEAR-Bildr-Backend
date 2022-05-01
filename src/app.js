const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models/index");
const logger = require("./helpers/logger.helper");
require("dotenv").config();

const { ENV, PORT, SESSION_SECRET, SESSION_LIFETIME } = process.env;

const AuthRouter = require("./routes/auth.route");
const UserRouter = require("./routes/user.route");

const app = express();

app.use(cookieParser());
app.use(morgan(ENV));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Session setup
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: Number(SESSION_LIFETIME),
    },
  })
);

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connection has been established successfully.");
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });

app.listen(Number(PORT), () => {
  logger.info(`Server stared on port ${PORT}`);
});
