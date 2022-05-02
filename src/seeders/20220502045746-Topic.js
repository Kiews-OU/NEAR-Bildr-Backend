module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Topics",
      [
        {
          parent_id: null,
          title: "Software Development",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          parent_id: 1,
          title: "Web Development",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          parent_id: 1,
          title: "Mobile App Development",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          parent_id: 1,
          title: "AI/ML Development",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Topics", null, {});
  },
};
