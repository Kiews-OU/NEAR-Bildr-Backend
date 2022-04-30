const yup = require("yup");

const authSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().email().required(),
});

const changePassword = yup.object({
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
  new_password: yup.string().min(8).max(20).required(),
  current_password: yup.string().required(),
});

const resetPassword = yup.object({
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
  new_password: yup.string().min(8).max(20).required(),
  email: yup.string().email().required(),
  verify_code: yup.number(),
});

module.exports.AuthSchema = authSchema;
module.exports.ChangePasswordSchema = changePassword;
module.exports.ResetPasswordSchema = resetPassword;
