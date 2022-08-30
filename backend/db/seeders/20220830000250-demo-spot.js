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

     await queryInterface.bulkInsert('Spots', [
      {
          ownerId: 1,
          address: "123 firstspot drive",
          city: "firstCity",
          state: "firstState",
          country: "USA",
          lat: 12.2323,
          lng: 12.3434,
          name: "Spot1",
          description: "Cozy spot very cozy wow",
          price: 70
      },
      {
        ownerId: 2,
        address: "456 secondspot drive",
        city: "secondCity",
        state: "secondState",
        country: "USA",
        lat: 13.3546,
        lng: 13.5677,
        name: "Spot2",
        description: "kinda dirty ngl",
        price: 10
      },
      {
        ownerId: 1,
          address: "789 thirdspot drive",
          city: "thirdCity",
          state: "thirdState",
          country: "USA",
          lat: 14.2324,
          lng: 14.3434,
          name: "Spot3",
          description: "I know what I have, pay up",
          price: 300
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
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
