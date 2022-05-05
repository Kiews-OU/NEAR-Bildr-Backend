const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Topic, CoursePurchasement, Video, Review }) {
      this.belongsTo(User, { foreignKey: "teacher_id" });
      this.belongsTo(Topic, { foreignKey: "topic_id" });
      this.hasMany(CoursePurchasement, { foreignKey: "course_id" });
      this.hasMany(Video, { foreignKey: "course_id" });
      this.hasMany(Review, { foreignKey: "video_id" });
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
