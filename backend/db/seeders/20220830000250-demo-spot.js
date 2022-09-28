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
          city: "Cullowhee",
          state: "North Carolina",
          country: "USA",
          lat: 12.2323,
          lng: 12.3434,
          name: "A-Frame cabin in the mountains of NC",
          description: "Our goal was to create a space that you could either choose to escape the hustle and bustle of life and relax taking in the scenery.",
          price: 300
      },
      {
        ownerId: 1,
        address: "456 secondspot drive",
        city: "Rockbridge",
        state: "Ohio",
        country: "USA",
        lat: 13.3546,
        lng: 13.5677,
        name: "Dunlap Hollow A-Frame",
        description: "The Dunlap Hollow A-Frame is a new build that will be completed in mid-March 2021. We are offering prebooking now with reservation dates beginning April 1, 2021.",
        price: 330
      },
      {
        ownerId: 1,
          address: "789 thirdspot drive",
          city: "South Haven",
          state: "Michigan",
          country: "USA",
          lat: 14.2324,
          lng: 14.3434,
          name: "Maple Haven - A Charming Lake Michigan Tree House",
          description: "Come immerse yourself with the peace and tranquility that Lake Michigan has to offer. ",
          price: 450
      },
      {
        ownerId: 1,
        address: "123 fourthspot drive",
        city: "Chikaming Township",
        state: "Michigan",
        country: "USA",
        lat: 12.23323,
        lng: 12.33434,
        name: "Goth A-frame!",
        description: "Make some memories at this unique and family-friendly Aframe in Harbert, MI. Built in 2021, the Harbert Hideout is located on a quiet street surrounded by nature. ",
        price: 370
    },
    {
      ownerId: 1,
      address: "456 fifth drive",
      city: "Frienship",
      state: "Wisconsin",
      country: "USA",
      lat: 13.32546,
      lng: 13.56277,
      name: "Castle Rock Boho A-frame",
      description: "Easy access to numerous wildlife conservation areas; Castle Rock and Petenwell County Parks as well as Buckhorn and and Roche-A-Cri State Parks! ",
      price: 400
    },
    {
      ownerId: 1,
        address: "789 sixth drive",
        city: "Flinstone",
        state: "Georgia",
        country: "USA",
        lat: 14.24324,
        lng: 14.34434,
        name: "Private chalet",
        description: "Get away from the hustle and bustle to kick back under tall trees and a blue southern sky at Windsong Chalet, our secluded hideaway on five wooded acres on Lookout Mountain. ",
        price: 450
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
