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
        url: 'https://images.ctfassets.net/r7p9m4b1iqbp/6Z2nsL6tub96On2hcZ6484/a876e061f2ebc8535615af51377992da/black-gables-a-frame-cabin-walhonding-ohio.jpg?w=1200&fm=webp&q=90',
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

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51982246/original/065c5115-5165-4d84-b6d2-962a006a0917.jpeg?im_w=1440',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-720123300938484648/original/c133a626-a1c6-4eee-b10a-b272b9a90bba.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/7b54eb15-a089-4885-ba20-92096aec89db.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/The_Bennati_House%2C_Lake_Arrowhead%2C_California.jpg/1920px-The_Bennati_House%2C_Lake_Arrowhead%2C_California.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-570413613868837211/original/55749629-83c1-4541-8062-91f00b92a207.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://images.ctfassets.net/r7p9m4b1iqbp/3vHVNUDzVg5KMdOoYX07Ap/3b28c87a3fe38e98581bffda2f6b413f/Washington-Index-Treeframe-Cabin-Exterior.jpg?w=1200&fm=webp&q=90',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46799020/original/944bc145-43bc-46ec-b141-f066abfeb2db.jpeg?im_w=1440',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-615752144938959999/original/84ed322e-2c30-4b8e-860a-11baf9fe9f45.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/b9ba1cf5-6070-48eb-95e3-1e98c4d3b109.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://images.ctfassets.net/r7p9m4b1iqbp/SQT2lKh294vo6EiWlcG1L/f98ba06d4bf19800641c14dc33ac7b21/sugar-grove-north-carolina-appalachian-a-frame-exterior.jpg?w=1200&fm=webp&q=90',
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
