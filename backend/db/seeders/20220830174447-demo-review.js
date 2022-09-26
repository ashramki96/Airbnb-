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