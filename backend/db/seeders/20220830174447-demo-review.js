'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Reviews', [
      {
          spotId: 1,
          userId: 1,
          review: "great spot",
          stars: 8

      },
      {
          spotId: 1,
          userId: 2,
          review: "below my lofty standards",
          stars: 4
      },
      {
          spotId: 2,
          userId: 3,
          review: "perfect spot",
          stars: 10
      },
      {
        spotId: 2,
        userId: 1,
        review: "average spot",
        stars: 5
    },
      {
        spotId: 3,
        userId: 2,
        review: "the worst spot",
        stars: 1
      },
      {
        spotId: 3,
        userId: 1,
        review: "not great",
        stars: 3
      }
        
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};