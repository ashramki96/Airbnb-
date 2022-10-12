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
          review: "I wish I could give this place 6 stars. The cabin was amazing!! The view from the porch every morning with coffee was the best, there were many local shops near by to explore, and the grounds were breath taking. The horses came up to say hello to us every day, we played frisbee in the front yard, and it was very fun to explore the property. If you are looking for a beautiful, peaceful cabin getaway from the loud city, this is the place! The surrounding town is beautiful too! Lots of walking trails and new places to explore.",
          stars: 5

      },
      {
          spotId: 1,
          userId: 3,
          review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
          stars: 2
      },
      
      {
        spotId: 2,
        userId: 2,
        review: "I wish I could give this place 6 stars. The cabin was amazing!! The view from the porch every morning with coffee was the best, there were many local shops near by to explore, and the grounds were breath taking. The horses came up to say hello to us every day, we played frisbee in the front yard, and it was very fun to explore the property. If you are looking for a beautiful, peaceful cabin getaway from the loud city, this is the place! The surrounding town is beautiful too! Lots of walking trails and new places to explore.",
        stars: 5

    },
    {
        spotId: 2,
        userId: 3,
        review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
        stars: 2
    },
   
    {
      spotId: 3,
      userId: 2,
      review: "I wish I could give this place 6 stars. The cabin was amazing!! The view from the porch every morning with coffee was the best, there were many local shops near by to explore, and the grounds were breath taking. The horses came up to say hello to us every day, we played frisbee in the front yard, and it was very fun to explore the property. If you are looking for a beautiful, peaceful cabin getaway from the loud city, this is the place! The surrounding town is beautiful too! Lots of walking trails and new places to explore.",
      stars: 5

  },
  {
      spotId: 3,
      userId: 3,
      review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
      stars: 2
  },
  
  {
    spotId: 4,
    userId: 2,
    review: "I wish I could give this place 6 stars. The cabin was amazing!! The view from the porch every morning with coffee was the best, there were many local shops near by to explore, and the grounds were breath taking. The horses came up to say hello to us every day, we played frisbee in the front yard, and it was very fun to explore the property. If you are looking for a beautiful, peaceful cabin getaway from the loud city, this is the place! The surrounding town is beautiful too! Lots of walking trails and new places to explore.",
    stars: 5

},
{
    spotId: 4,
    userId: 3,
    review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
    stars: 2
},

{
  spotId: 5,
  userId: 2,
  review: "I wish I could give this place 6 stars. The cabin was amazing!! The view from the porch every morning with coffee was the best, there were many local shops near by to explore, and the grounds were breath taking. The horses came up to say hello to us every day, we played frisbee in the front yard, and it was very fun to explore the property. If you are looking for a beautiful, peaceful cabin getaway from the loud city, this is the place! The surrounding town is beautiful too! Lots of walking trails and new places to explore.",
  stars: 5

},
{
  spotId: 5,
  userId: 3,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},

{
  spotId: 6,
  userId: 2,
  review: "I wish I could give this place 6 stars. The cabin was amazing!! The view from the porch every morning with coffee was the best, there were many local shops near by to explore, and the grounds were breath taking. The horses came up to say hello to us every day, we played frisbee in the front yard, and it was very fun to explore the property. If you are looking for a beautiful, peaceful cabin getaway from the loud city, this is the place! The surrounding town is beautiful too! Lots of walking trails and new places to explore.",
  stars: 5

},
{
  spotId: 6,
  userId: 3,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},

{
  spotId: 7,
  userId: 3,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 7,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 8,
  userId: 3,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 8,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 9,
  userId: 3,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},

  {
    spotId: 9,
    userId: 1,
    review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
    stars: 2
  },
  {
    spotId: 10,
    userId: 3,
    review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
    stars: 4
  },

{
  spotId: 10,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 11,
  userId: 3,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 11,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 12,
  userId: 2,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 12,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 13,
  userId: 2,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 13,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 14,
  userId: 2,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 14,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 15,
  userId: 2,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 15,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
  stars: 4
},
{
  spotId: 16,
  userId: 2,
  review: "We had a fabulous time at this stunning property. It was nice to relax on the farm. The views were amazing. Our family really enjoyed our stay and we hope to come back one of these days. Highly recommend if you need to disconnect from your world!",
  stars: 2
},
{
  spotId: 16,
  userId: 1,
  review: "Great location, privacy and spot on description. The owner was accommodating and check in was simple. We were able to enjoy time on the front porch and build a fire our back at night. Really a private, quiet location. Tons of birds and squirrels frequent the front porch and 5 horses are usually within sight to greet you.",
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