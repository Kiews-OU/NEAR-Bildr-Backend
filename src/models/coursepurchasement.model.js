const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CoursePurchasement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Course, User }) {
      this.belongsTo(Course, { foreignKey: "course_id" });
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  CoursePurchasement.init(
    {},
    {
      sequelize,
      modelName: "CoursePurchasement",
    }
  );
  return CoursePurchasement;
};
