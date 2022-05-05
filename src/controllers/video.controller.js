const logger = require("../helpers/logger.helper");
const JwtHelper = require("../helpers/jwt.helper");
const VideoService = require("../services/video.service");

const VideoController = {
  CreateVideo: async (req, res) => {
    try {
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const videoAttribute = req.body;
      const newVideo = await VideoService.CreateVideo(videoAttribute, userId);
      if (!newVideo) {
        return res
          .status(403)
          .json({ err: "Permission Denied", status: false });
      }
      return res.status(200).json({
        data: { video: newVideo },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  UploadVideo: async (req, res) => {
    try {
      const { video: videoId } = req.params;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const { file: video } = req.body;
      const uploadVideo = await VideoService.UploadVideo(
        videoId,
        video,
        userId
      );
      if (!uploadVideo)
        return res
          .status(403)
          .json({ err: "Permission Denied", status: false });
      return res
        .status(200)
        .json({ msg: "Video uploaded successfully", status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  UpdateVideo: async (req, res) => {
    try {
      const { video: videoId } = req.params;
      const { userId } = await JwtHelper.GetJwtPayload(req);
      const videoAttribute = req.body;
      const updatedVideo = await VideoService.UpdateVideo(
        videoId,
        videoAttribute,
        userId
      );
      if (!updatedVideo)
        return res
          .status(403)
          .json({ err: "Permission Denied", status: false });
      return res.status(200).json({
        data: { video: updatedVideo },
        status: true,
      });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
};

module.exports = VideoController;
