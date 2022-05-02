const TopicService = require("../services/topic.service");
const logger = require("../helpers/logger.helper");

const TopicController = {
  GetTopics: async (req, res) => {
    try {
      const topics = await TopicService.GetTopics();
      if (!topics)
        return res
          .status(500)
          .json({ err: "Something went wrong", status: false });
      return res.status(200).json({ data: { topics }, status: true });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
  GetSubtopics: async (req, res) => {
    try {
      const { topic } = req.params;
      const subtopics = await TopicService.GetSubtopics(topic);
      if (!subtopics)
        return res
          .status(500)
          .json({ err: "Something went wrong", status: false });
      return res.status(200).json({ data: { subtopics } });
    } catch (err) {
      logger.error(err);
      return res
        .status(500)
        .json({ err: "Something went wrong", status: false });
    }
  },
};

module.exports = TopicController;
