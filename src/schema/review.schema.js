const yup = require("yup");

const reviewSchema = yup.object({
  rating: yup.string().required(),
  description: yup.string().required(),
});

const updateReviewSchema = yup.object({
  course_id: yup.string().required(),
  rating: yup.string().required(),
  description: yup.string().required(),
});

module.exports.ReviewSchema = reviewSchema;
module.exports.UpdateReviewSchema = updateReviewSchema;
