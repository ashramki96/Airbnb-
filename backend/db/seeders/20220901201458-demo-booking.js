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
     await queryInterface.bulkInsert('Bookings', [
      // {
      //   spotId: 1,
      //   userId: 2,
      //   startDate: Date ("2023-01-10"),
      //   endDate: Date("2023-01-15")
      // },
      // {
      //   spotId: 2,
      //   userId: 3,
      //   startDate: Date ("2023-02-10"),
      //   endDate: Date("2023-02-15")
      // },
      // {
      //   spotId: 3,
      //   userId: 2,
      //   startDate: Date("2023-03-10"),
      //   endDate: Date("2023-03-15")
      // },

    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', null, {});
  }
};
