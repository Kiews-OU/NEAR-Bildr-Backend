const { UserRole } = require("../helpers/user.helper");
const { hashPassword } = require("../helpers/utility");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "Near",
          last_name: "Teacher",
          email: "teacher@near.org",
          password: hashPassword("nearisamazing!"),
          role: UserRole.teacher,
          is_active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          first_name: "Near",
          last_name: "Student",
          email: "student@near.org",
          password: hashPassword("nearisamazing!"),
          role: UserRole.student,
          is_active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
