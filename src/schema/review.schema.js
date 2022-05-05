const yup = require("yup");

const reviewSchema = yup.object({
  rating: yup.string().required(),
  description: yup.string().required(),
});

module.exports.ReviewSchema = reviewSchema;
