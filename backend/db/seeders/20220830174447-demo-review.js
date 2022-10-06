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
          userId: 2,
          review: "great spot",
          stars: 5

      },
      {
          spotId: 1,
          userId: 3,
          review: "below my lofty standards",
          stars: 2
      },
      
      {
        spotId: 2,
        userId: 2,
        review: "great spot",
        stars: 5

    },
    {
        spotId: 2,
        userId: 3,
        review: "below my lofty standards",
        stars: 2
    },
   
    {
      spotId: 3,
      userId: 2,
      review: "great spot",
      stars: 5

  },
  {
      spotId: 3,
      userId: 3,
      review: "below my lofty standards",
      stars: 2
  },
  
  {
    spotId: 4,
    userId: 2,
    review: "great spot",
    stars: 5

},
{
    spotId: 4,
    userId: 3,
    review: "below my lofty standards",
    stars: 2
},

{
  spotId: 5,
  userId: 2,
  review: "great spot",
  stars: 5

},
{
  spotId: 5,
  userId: 3,
  review: "below my lofty standards",
  stars: 2
},

{
  spotId: 6,
  userId: 2,
  review: "great spot",
  stars: 5

},
{
  spotId: 6,
  userId: 3,
  review: "below my lofty standards",
  stars: 2
},

{
  spotId: 7,
  userId: 3,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 7,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 8,
  userId: 3,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 8,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 9,
  userId: 3,
  review: "below my lofty standards",
  stars: 2
},
  {
    spotId: 9,
    userId: 3,
    review: "below my lofty standards",
    stars: 2
  },
  {
    spotId: 10,
    userId: 1,
    review: "very nice",
    stars: 4
  },

{
  spotId: 10,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 11,
  userId: 3,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 11,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 12,
  userId: 2,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 12,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 13,
  userId: 2,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 13,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 14,
  userId: 2,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 14,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 15,
  userId: 2,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 15,
  userId: 1,
  review: "very nice",
  stars: 4
},
{
  spotId: 16,
  userId: 2,
  review: "below my lofty standards",
  stars: 2
},
{
  spotId: 16,
  userId: 1,
  review: "very nice",
  stars: 4
},



      
        
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