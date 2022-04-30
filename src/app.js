const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models/index");
const logger = require("./helpers/logger.helper");
require("dotenv").config();

const { ENV, PORT } = process.env;

const AuthRouter = require("./routes/auth.route");

const app = express();

app.use(cookieParser());
app.use(morgan(ENV));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api/auth", AuthRouter);

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
