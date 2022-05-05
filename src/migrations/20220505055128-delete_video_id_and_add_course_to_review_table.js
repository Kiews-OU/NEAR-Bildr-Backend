module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Reviews", // table name
        "course_id", // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.removeColumn("Reviews", "video_id"),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Reviews", // table name
        "video_id", // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.removeColumn("Reviews", "course_id"),
    ]);
  },
};
