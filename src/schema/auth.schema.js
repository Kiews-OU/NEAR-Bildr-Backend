const yup = require("yup");
const { GenderList, UserRole } = require("../helpers/user.helper");

const registrationSchema = yup.object({
  role: yup
    .string()
    .required()
    .oneOf([Object.values(UserRole), null]),
  gender: yup
    .string()
    .required()
    .oneOf([Object.values(GenderList), null]),
  password: yup.string().min(8).max(20).required(),
  email: yup.string().email().required(),
  last_name: yup.string().required(),
  first_name: yup.string().required(),
  profile_image: yup.string(),
});

const loginSchema = yup.object({
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

module.exports.RegistrationSchema = registrationSchema;
module.exports.LoginSchema = loginSchema;
module.exports.ChangePasswordSchema = changePassword;
module.exports.ResetPasswordSchema = resetPassword;
