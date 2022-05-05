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
        data: { courses },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  GetCourse: async (req, res) => {
    try {
      const { course: courseId } = req.params;
      const course = await CourseService.GetCourse(courseId);
      if (!course)
        return res.status(404).json({
          err: `No courses found by this id ${courseId}`,
          status: false,
        });
      return res.status(200).json({ data: { course }, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  GetCourses: async (req, res) => {
    try {
      const courses = await CourseService.GetCourses();
      if (!courses)
        return res
          .status(500)
          .json({ err: "Something went wrong", status: false });
      return res.status(200).json({ data: { courses }, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  UpdateCourse: async (req, res) => {
    try {
      const { course: courseId } = req.params;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const courseAttribute = req.body;
      const course = await CourseService.GetCourse(courseId);
      if (!course)
        return res.status(404).json({
          err: `No course found by this id ${courseId}`,
          status: false,
        });
      const updatedCourse = await CourseService.UpdateCourse(
        courseId,
        courseAttribute,
        userId
      );
      if (updatedCourse === null) {
        return res
          .status(403)
          .json({ err: "You don't have permission to delete", status: false });
      }
      return res.status(200).json({
        data: { course: updatedCourse },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  SearchCourses: async (req, res) => {
    try {
      const { query } = req.params;
      const courses = await CourseService.SearchCourses(query);
      if (courses === null) {
        return res.status(200).json({
          msg: `No courses found by this query ${query}`,
          status: true,
        });
      }
      return res
        .status(200)
        .json({ data: { courses }, count: courses.length, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  DeleteCourse: async (req, res) => {
    try {
      const { course: courseId } = req.params;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const deletedCourse = await CourseService.DeleteCourse(courseId, userId);
      if (!deletedCourse) {
        return res
          .status(403)
          .json({ err: "You don't have permission to delete", status: false });
      }
      return res
        .status(200)
        .json({ msg: "Course deleted successfully", status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
};

module.exports = CourseController;
