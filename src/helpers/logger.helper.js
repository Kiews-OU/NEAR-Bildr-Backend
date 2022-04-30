const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logFormat = format.printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`
);

const transport = new DailyRotateFile({
  filename: "./logs/server-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
});

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [transport, new transports.Console()],
});

module.exports = logger;
