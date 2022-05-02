const route = require("express").Router();

const TopicController = require("../controllers/topic.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const { UserRole } = require("../helpers/user.helper");

route.get(
  "/get-topics",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  TopicController.GetTopics
);

route.get(
  "/get-subtopics/:topic",
  Authenticate,
  Authorize([UserRole.student, UserRole.teacher]),
  TopicController.GetSubtopics
);

module.exports = route;
