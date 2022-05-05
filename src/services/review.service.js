const logger = require("../helpers/logger.helper");
const { Review } = require("../models");

const ReviewService = {
  CreateReview: async (reviewAttribute, courseId, userId) => {
    try {
      const review = new Review({
        course_id: courseId,
        user_id: userId,
        rating: reviewAttribute.rating,
        description: reviewAttribute.description,
      });
      return await review.save();
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = ReviewService;
