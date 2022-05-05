const route = require("express").Router();

const ReviewController = require("../controllers/review.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { ReviewSchema } = require("../schema/review.schema");

const { UserRole } = require("../helpers/user.helper");

route.post(
  "/create-review/:course",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  Validation(ReviewSchema),
  ReviewController.CreateReview
);

module.exports = route;
