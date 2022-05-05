const logger = require("../helpers/logger.helper");
const { Video, Course } = require("../models");

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
};

module.exports = VideoService;
