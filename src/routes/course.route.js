const route = require("express").Router();

const CourseController = require("../controllers/course.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { CourseSchema } = require("../schema/course.schema");

const { UserRole } = require("../helpers/user.helper");

const {
  SetType,
  Upload,
  SetUploadFileToBody,
} = require("../helpers/multer.helper");

route.post(
  "/create-course",
  Authenticate,
  Authorize([UserRole.teacher]),
  SetType("thumbnails"),
  Upload.single("thumbnail"),
  SetUploadFileToBody,
  Validation(CourseSchema),
  CourseController.CreateCourse
);

route.get(
  "/get-courses/:teacher",
  Authenticate,
  Authorize([UserRole.student, UserRole.teacher]),
  CourseController.GetTeacherCourses
);

route.get(
  "/get-course/:course",
  Authenticate,
  Authorize([UserRole.student, UserRole.teacher]),
  CourseController.GetCourse
);

module.exports = route;
