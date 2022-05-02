const logger = require("../helpers/logger.helper");
const { Topic } = require("../models");

const TopicService = {
  GetTopics: async () => {
    try {
      const filter = { parent_id: null };
      const topics = await Topic.findAll({ where: filter });
      return topics;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
  GetSubtopics: async (topic) => {
    try {
      const filter = { parent_id: topic };
      const subtopics = await Topic.findAll({ where: filter });
      return subtopics;
    } catch (err) {
      return logger.error(`Query Execution failed: \n ${err}`);
    }
  },
};

module.exports = TopicService;
