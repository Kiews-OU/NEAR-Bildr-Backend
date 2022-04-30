const logger = require("../helpers/logger.helper");

const validation = (schema) => async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validate(body);
    return next();
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ err });
  }
};

module.exports = validation;
