const logger = require("../helpers/logger.helper");
const { Video, Course, CoursePurchasement } = require("../models");

const VideoService = {
  CreateVideo: async (videoAttribute, userId) => {
    try {
      const filter = { id: videoAttribute.course_id, teacher_id: userId };
      const course = await Course.findOne({ where: filter });
      if (!course) return null;
      const video = new Video({
        title: videoAttribute.title,
        thumbnail: videoAttribute.file,
        description: videoAttribute.description,
        course_id: videoAttribute.course_id,
      });
      return await video.save();
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetVideos: async (courseId, userId) => {
    try {
      const filter = { user_id: userId, course_id: courseId };
      const coursesPurchasement = await CoursePurchasement.findAll({
        where: filter,
      });
      if (!coursesPurchasement) return null;
      const videos = await Video.findAll({ where: { course_id: courseId } });
      return videos;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  UploadVideo: async (videoId, videoPath, userId) => {
    try {
      const video = await Video.findOne({ where: { id: videoId } });
      const filter = { id: video.course_id, teacher_id: userId };
      const course = await Course.findOne({ where: filter });
      if (!course) return null;
      const filter2 = { id: videoId };
      const update = {
        video: videoPath,
      };
      return await Video.update(update, {
        where: filter2,
      });
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  UpdateVideo: async (videoId, videoAttribute, userId) => {
    try {
      const filter = { id: videoAttribute.course_id, teacher_id: userId };
      const course = await Course.findOne({ where: filter });
      if (!course) return null;
      const filter2 = { id: videoId };
      const update = {
        title: videoAttribute.title,
        thumbnail: videoAttribute.file,
        description: videoAttribute.description,
        course_id: videoAttribute.course_id,
      };
      const updatedVideo = await Video.update(update, {
        where: filter2,
      });
      if (updatedVideo[0] === 0) {
        logger.error("Permission Denied");
      }
      const video = await Video.findOne({ where: filter2 });
      return video;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  DeleteVideo: async (videoId, userId) => {
    try {
      const video = await Video.findOne({ where: { id: videoId } });
      const filter = { id: video.course_id, teacher_id: userId };
      const course = await Course.findOne({ where: filter });
      if (!course) return null;
      await Video.destroy({ where: { id: videoId } });
      return true;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = VideoService;
