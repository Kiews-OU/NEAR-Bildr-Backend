const route = require("express").Router();

const UserController = require("../controllers/user.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { UpdateProfileSchema } = require("../schema/user.schema");

const { UserRole } = require("../helpers/user.helper");

route.put(
  "/update-profile",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  Validation(UpdateProfileSchema),
  UserController.UpdateProfile
);

module.exports = route;
