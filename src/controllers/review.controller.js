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
};

module.exports = ReviewController;
