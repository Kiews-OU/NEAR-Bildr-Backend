const route = require("express").Router();

const AuthController = require("../controllers/auth.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const {
  RegistrationSchema,
  LoginSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
} = require("../schema/auth.schema");

const { UserRole } = require("../helpers/user.helper");

route.post(
  "/create-user",
  Validation(RegistrationSchema),
  AuthController.CreateUser
);

route.post("/login", Validation(LoginSchema), AuthController.Login);

route.put(
  "/change-password",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  Validation(ChangePasswordSchema),
  AuthController.ChangePassword
);

route.post(
  "/reset-password",
  Validation(ResetPasswordSchema),
  AuthController.ResetPassword
);

route.post("/generate-access-token", AuthController.GetAccessToken);

module.exports = route;
