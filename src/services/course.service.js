const logger = require("../helpers/logger.helper");
const { Course, Topic } = require("../models");

const CourseService = {
  CreateCourse: async (courseAttribute) => {
    try {
      const course = new Course({
        title: courseAttribute.title,
        thumbnail: courseAttribute.file,
        description: courseAttribute.description,
        price: courseAttribute.price,
        topic_id: courseAttribute.topic_id,
        teacher_id: courseAttribute.teacher_id,
      });
      return await course.save();
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetTeacherCourses: async (teacher) => {
    try {
      const filter = { teacher_id: teacher };
      const courses = await Course.findAll({ where: filter });
      return courses;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetCourse: async (course) => {
    try {
      const filter = { id: course };
      return await Course.findOne({ where: filter });
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetCourses: async () => {
    try {
      const courses = await Course.findAll({
        limit: 15,
      });
      return courses;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  UpdateCourse: async (courseId, courseAttribute, userId) => {
    try {
      const filter = { id: courseId, teacher_id: userId };
      const update = {
        title: courseAttribute.title,
        thumbnail: courseAttribute.file,
        description: courseAttribute.description,
        price: courseAttribute.price,
        topic_id: courseAttribute.topic_id,
      };
      const updatedCourse = await Course.update(update, {
        where: filter,
      });
      if (updatedCourse[0] === 0) {
        return new Error("Permission Denied");
      }
      const course = await Course.findOne({ where: filter });
      return course;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  DeleteCourse: async (courseId, userId) => {
    try {
      const filter = { id: courseId, teacher_id: userId };
      const course = await Course.destroy({ where: filter });
      if (course[0] === 0) {
        return new Error("Permission Denied");
      }
      return true;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetTopics: async () => {
    try {
      const topics = await Topic.findAll({});
      return topics;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = CourseService;
