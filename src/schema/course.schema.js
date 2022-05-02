const yup = require("yup");

const courseSchema = yup.object({
  topic_id: yup.string().required(),
  price: yup.string().required(),
  file: yup.string().required(),
  description: yup.string().required(),
  title: yup.string().required(),
});

module.exports.CourseSchema = courseSchema;
