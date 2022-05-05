module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Videos", // table name
        "course_id", // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      ),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([queryInterface.removeColumn("Videos", "course_id")]);
  },
};
