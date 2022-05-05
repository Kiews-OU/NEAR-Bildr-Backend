const ReviewService = require("../services/review.service");
const logger = require("../helpers/logger.helper");
const JwtHelper = require("../helpers/jwt.helper");

const ReviewController = {
  CreateReview: async (req, res) => {
    try {
      const { course: courseId } = req.params;
      const reviewAttribute = req.body;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const review = await ReviewService.CreateReview(
        reviewAttribute,
        courseId,
        userId
      );
      if (!review)
        return res
          .status(500)
          .json({ err: "Something went wrong", status: true });
      return res.status(200).json({ data: { review }, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  GetReviews: async (req, res) => {
    try {
      const { course: courseId } = req.params;
      const reviews = await ReviewService.GetReviews(courseId);
      if (!reviews)
        return res
          .status(500)
          .json({ err: "Something went wrong", status: true });
      return res.status(200).json({ data: { reviews }, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: true });
    }
  },
  UpdateReview: async (req, res) => {
    try {
      const { review: reviewId } = req.params;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const reviewAttribute = req.body;
      const updatedReview = await ReviewService.UpdateReview(
        reviewId,
        reviewAttribute,
        userId
      );
      if (updatedReview === null) {
        return res
          .status(403)
          .json({ err: "You don't have permission to update", status: false });
      }
      return res.status(200).json({
        data: { review: updatedReview },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: true });
    }
  },
  DeleteReview: async (req, res) => {
    try {
      const { review: reviewId } = req.params;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const deletedReview = await ReviewService.DeleteReview(reviewId, userId);
      if (!deletedReview) {
        return res
          .status(403)
          .json({ err: "You don't have permission to delete", status: false });
      }
      return res
        .status(200)
        .json({ msg: "Review deleted successfully", status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: true });
    }
  },
};

module.exports = ReviewController;
