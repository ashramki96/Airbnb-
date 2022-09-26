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
          description: "When we found the Branch house in its previous condition, we knew it needed a little love to live its full glory. Sitting on the Cashier/Glenville border, we're just a 10 minute drive into the center of town. Our goal was to create a space that you could either choose to escape the hustle and bustle of life and relax taking in the scenery around the property or have the perfect place to rest after a day of hiking, fishing, or enjoying one of the many local swimming holes.",
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
        description: "The Dunlap Hollow A-Frame is a new build that will be completed in mid-March 2021. We are offering prebooking now with reservation dates beginning April 1, 2021. The A-Frame sleeps up to 10 guests with 3 bedrooms and a picturesque loft filled with windows that sleeps 4. ",
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
          description: "Come immerse yourself with the peace and tranquility that Lake Michigan has to offer. Hear the waves from this charming tree house and experience breathtaking sunsets from the view point which is just steps away. There is also a private accesspoint to Lake Michigan. Nestled between downtown South Haven and Saugatuck and close to all the great things SW Michigan has to offer—breweries, raspberry /blueberry/ apple picking, vineyards, wine tasting and public beaches. Ultra highspeed WIFI included.",
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
        description: "Make some memories at this unique and family-friendly Aframe in Harbert, MI. Built in 2021, the Harbert Hideout is located on a quiet street surrounded by nature. Relax on the 1,400 square foot patio by enjoying the hot tub or grilling and dining outdoors. At night, start a fire in the fire pit and stargaze in an adirondack chair.",
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
      description: "5 minutes from the Dells! Unique A-frame house 2 minutes from Castle Rock Park. Easy access to numerous wildlife conservation areas; Castle Rock and Petenwell County Parks as well as Buckhorn and and Roche-A-Cri State Parks! Lake Petenwell and Castle Rock Lake (Wisconsin's 2nd and 4th largest lakes respectively) are within close proximity to the property.",
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
        description: "Get away from the hustle and bustle to kick back under tall trees and a blue southern sky at Windsong Chalet, our secluded hideaway on five wooded acres on Lookout Mountain. You'll love being minutes from trails and natural wonders, seven miles from the state line, and just 14 miles from the center of downtown Chattanooga.",
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
