const yup = require("yup");

const videoSchema = yup.object({
  course_id: yup.string().required(),
  file: yup.string().required(),
  description: yup.string().required(),
  title: yup.string().required(),
});

const uploadVideoSchema = yup.object({
  file: yup.string().required(),
});

module.exports.VideoSchema = videoSchema;
module.exports.UploadVideoSchema = uploadVideoSchema;
