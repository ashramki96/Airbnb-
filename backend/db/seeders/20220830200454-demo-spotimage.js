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
      {
        spotId: 17,
        url: 'https://pictures.lodgix.com/media/gallery/property-75953/i018511_preview.jpg',
        preview: true
      },

      {
        spotId: 18,
        url: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        preview: true
      },

      {
        spotId: 19,
        url: 'https://www.build-review.com/wp-content/uploads/2021/10/Cabin.jpg',
        preview: true
      },

      {
        spotId: 20,
        url: 'https://www.christiesrealestate.com/blog/wp-content/uploads/2021/12/river-house-estate-telkwa-british-columbia-1.jpg',
        preview: true
      },

      {
        spotId: 21,
        url: 'https://www.gannett-cdn.com/presto/2021/02/22/PMJS/bea98437-5223-4f79-9d4c-3ae1f13947e3-vikingcabin.jpg?crop=4031,2268,x0,y373&width=3200&height=1801&format=pjpg&auto=webp',
        preview: true
      },

      {
        spotId: 22,
        url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiaW58ZW58MHx8MHx8&w=1000&q=80',
        preview: true
      },

      {
        spotId: 23,
        url: 'https://newyorkrentalbyowner.com/blog/wp-content/uploads/2020/01/Cayuga-Lake-vacation-rentals.jpg',
        preview: true
      },
      {
        spotId: 24,
        url: 'https://images.mansionglobal.com/im-447463?width=1299&height=815',
        preview: true
      },
      {
        spotId: 25,
        url: 'https://www.cabinsforyou.com/public/img/gatlinburg-cabin-rentals-drone-hero.jpg',
        preview: true
      },
      {
        spotId: 26,
        url: 'https://media.mybnbwebsite.com/6550/pano_HH_1500x750.jpg',
        preview: true
      },
      {
        spotId: 27,
        url: 'https://www.brysoncitycabinrentals.com/custimages/slide2.jpg',
        preview: true
      },
      {
        spotId: 28,
        url: 'https://i.insider.com/62bd175269fbfd0018ee0419?width=1300&format=jpeg&auto=webp',
        preview: true
      },
      {
        spotId: 29,
        url: 'https://i.insider.com/62bd198a69fbfd0018ee044d?width=1200&format=jpeg&auto=webp',
        preview: true
      },
      {
        spotId: 30,
        url: 'https://i.insider.com/62bd188669fbfd0018ee0434?width=1200&format=jpeg&auto=webp',
        preview: true
      },
      {
        spotId: 31,
        url: 'https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        preview: true
      },
      {
        spotId: 32,
        url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
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
