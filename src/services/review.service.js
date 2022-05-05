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
  GetReviews: async (courseId) => {
    try {
      const reviews = await Review.findAll({ where: { course_id: courseId } });
      return reviews;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  UpdateReview: async (reviewId, reviewAttribute, userId) => {
    try {
      const filter = { id: reviewId, user_id: userId };
      const update = {
        course_id: reviewAttribute.course_id,
        user_id: userId,
        rating: reviewAttribute.rating,
        description: reviewAttribute.description,
      };
      const updatedReview = await Review.update(update, {
        where: filter,
      });
      if (updatedReview === null) {
        return new Error("Permission Denied");
      }
      const review = await Review.findOne({ where: filter });
      return review;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  DeleteReview: async (reviewId, userId) => {
    try {
      const filter = { id: reviewId, user_id: userId };
      const review = await Review.destroy({ where: filter });
      if (review === null) {
        return new Error("Permission Denied");
      }
      return true;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = ReviewService;
