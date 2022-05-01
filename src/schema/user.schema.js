const yup = require("yup");
const { GenderList, UserRole } = require("../helpers/user.helper");

const updateProfileSchema = yup.object({
  role: yup
    .string()
    .required()
    .oneOf([Object.values(UserRole), null]),
  gender: yup
    .string()
    .required()
    .oneOf([Object.values(GenderList), null]),
  email: yup.string().email().required(),
  last_name: yup.string().required(),
  first_name: yup.string().required(),
  profile_image: yup.string(),
});

module.exports.UpdateProfileSchema = updateProfileSchema;
