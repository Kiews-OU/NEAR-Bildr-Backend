const route = require("express").Router();

const AuthController = require("../controllers/auth.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const {
  AuthSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
} = require("../schema/auth.schema");

const { UserRole } = require("../helpers/user.helper");

route.post("/login", Validation(AuthSchema), AuthController.Login);

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

module.exports = route;
