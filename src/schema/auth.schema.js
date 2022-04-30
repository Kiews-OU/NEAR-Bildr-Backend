const yup = require("yup");

const authSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().email().required(),
});

module.exports.AuthSchema = authSchema;
