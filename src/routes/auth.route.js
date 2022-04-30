const route = require("express").Router();

const AuthController = require("../controllers/auth.controller");

const Validation = require("../middlewares/validation.middleware");

const { AuthSchema } = require("../schema/auth.schema");

route.post("/login", Validation(AuthSchema), AuthController.Login);

module.exports = route;
