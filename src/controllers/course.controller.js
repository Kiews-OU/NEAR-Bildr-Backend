const CourseService = require("../services/course.service");
const logger = require("../helpers/logger.helper");
const JwtHelper = require("../helpers/jwt.helper");

const CourseController = {
  CreateCourse: async (req, res) => {
    try {
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const courseAttribute = req.body;
      courseAttribute.teacher_id = userId;
      const newCourse = await CourseService.CreateCourse(courseAttribute);
      if (!newCourse) {
        return res
          .status(500)
          .json({ err: "Something went wrong", status: false });
      }
      return res.status(200).json({
        data: { course: newCourse },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  GetTeacherCourses: async (req, res) => {
    try {
      const { teacher } = req.params;
      const courses = await CourseService.GetTeacherCourses(teacher);
      if (!courses)
        return res
          .status(500)
          .json({ err: "Something went wrong", status: false });
      return res.status(200).json({
        data: { course: courses },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
};

module.exports = CourseController;
