const logger = require("../helpers/logger.helper");
const { Course } = require("../models");

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
};

module.exports = CourseService;
