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
        name: "A-frame in the Woods",
        description: "Get away from the hustle and bustle to kick back under tall trees and a blue southern sky at Windsong Chalet, our secluded hideaway on five wooded acres on Lookout Mountain. ",
        price: 450
    },
    //--------owner 2 spots
    {
      ownerId: 2,
        address: "1234 seventh drive",
        city: "Flinstone",
        state: "Georgia",
        country: "USA",
        lat: 14.2434424,
        lng: 14.344324434,
        name: "Private chalet",
        description: "Get away from the hustle and bustle to kick back under tall trees and a blue southern sky at Windsong Chalet, our secluded hideaway on five wooded acres on Lookout Mountain. ",
        price: 450
    },

    {
      ownerId: 2,
        address: "1234 eighth drive",
        city: "Waverly",
        state: "Tennessee",
        country: "USA",
        lat: 14.2444233243,
        lng: 14.342344344,
        name: "Timeless A Cabin",
        description: "This newly renovated A frame cabin has ultimate privacy, there are no close neighbors, yet it conveniently located by highway. ",
        price: 250
    },

    {
      ownerId: 2,
        address: "1234 ninth drive",
        city: "Fennville",
        state: "Michigan",
        country: "USA",
        lat: 14.244324,
        lng: 14.344434,
        name: "Cozy A-Frame",
        description: "Completely renovated in 2022, Applewood Lodge is large enough for 8 but also perfect for a romantic getaway for 2.",
        price: 150
    },

    {
      ownerId: 2,
        address: "1234 tenth drive",
        city: "Elizabeth",
        state: "Illinois",
        country: "USA",
        lat: 14.245234324,
        lng: 14.3442344345,
        name: "Countryside A-Frame",
        description: "Escape to Galena's countryside and enjoy this quaint A-frame cottage over looking the pasture and beautiful rolling hills.",
        price: 450
    },

    {
      ownerId: 2,
        address: "1234 eleventh drive",
        city: "Branson",
        state: "Missouri",
        country: "USA",
        lat: 14.24323423424676,
        lng: 14.34432342346764,
        name: "Bucksaw Bear Cabin",
        description: "Escape to your very own cedar A-frame cabin to enjoy where you can take it easy at this peaceful quiet spot with a peek-a-boo view of Lake Taneycomo! ",
        price: 450
    },

    {
      ownerId: 3,
        address: "1234 twelfth drive",
        city: "St. Joe",
        state: "Arkansas",
        country: "USA",
        lat: 14.2433234324676,
        lng: 14.3443323436764,
        name: "Delightful A Frame Treehouse",
        description: "Perfectly positioned in the forest of the Ozarks as if it was meant to be there. Surround yourself with nature as you relax in the inground hot spa. ",
        price: 450
    },

    {
      ownerId: 3,
        address: "1234 thirteenth drive",
        city: "Insbrook",
        state: "Missouri",
        country: "USA",
        lat: 14.243232423434676,
        lng: 14.344332423633764,
        name: "The Ridge by Innsbrook Vacations",
        description: "Cozy 3 Bedroom 2 Bathroom Chalet Located in the Heart of Innsbrook! ",
        price: 450
    },

    {
      ownerId: 3,
        address: "1234 fourteenth drive",
        city: "Sevierville",
        state: "Tennessee",
        country: "USA",
        lat: 14.233333244324676,
        lng: 14.3433332342436764,
        name: "Cozy A-frame - Private outdoor space",
        description: "Welcome to Hillside Hideaway - a charming A-frame cottage just minutes from all the attractions in Pigeon Forge and the Tanger Outlets. ",
        price: 450
    },

    {
      ownerId: 3,
        address: "1234 fifteenth drive",
        city: "South Haven",
        state: "Michigan",
        country: "USA",
        lat: 14.243246764534,
        lng: 14.3443676445435,
        name: "Secluded Rustic Home",
        description: "Secluded Rustic Home on Lake Michigan ",
        price: 150
    },

    {
      ownerId: 3,
        address: "1234 sixteenth drive",
        city: "Innsbrook",
        state: "Missouri",
        country: "USA",
        lat: 14.25643223454676,
        lng: 14.37744352436764,
        name: "Quiet Lakefront Cottage",
        description: "If you're searching for an incredible retreat filled with endless recreational options, look no further than this spectacular Innsbrook vacation rental. ",
        price: 450
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
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
