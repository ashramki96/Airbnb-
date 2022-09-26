'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/66dbaf4a-b3aa-4b2f-b3f5-369a5151661e.jpg?im_w=1440',
        preview: true
      },

      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0862735b-4abc-4d87-a8d1-f2fb6053adc8.jpeg?im_w=1200',
        preview: true
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/0b075dc9-94b0-4b2a-8400-5c27f3492ffa.jpg?im_w=1200',
        preview: true
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/298590fe-cf0e-43ee-80c3-bc609f497004.jpg?im_w=1440',
        preview: true
      },

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/02ed915b-4090-4ae8-9dcb-e496d254b4c2.jpg?im_w=1440',
        preview: true
      },

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-23167774/original/b4fb8c4c-9ea9-4989-b47c-258d57074fbf.jpeg?im_w=1200',
        preview: true
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
