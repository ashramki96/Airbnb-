const express = require('express');
const { Spot, Review, SpotImage, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
    check('address')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid address.'),
    check('city')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a city.'),
    check('state')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a state.'),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Please provide a country'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Please provide a valid latitude'),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage('Please provide a valid longitude'),
    check('name')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a name'),
    check('description')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a description'),
    check('price')
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage('Please provide a price'),
    handleValidationErrors
  ];

router.get('/', async (req, res) => {


    const spots = await Spot.findAll({
        group: ["Reviews.spotId", "SpotImages.url"],
        include: [{
            model: Review,
            attributes: []
        },

        {
            model: SpotImage,
            attributes: ["url"]
        }],
        attributes: {

            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
        },

    });

    return res.json({
        spots,
    });
});

router.post('/', validateSignup, async (req, res) => {
    const {user} = req
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId: user.id
    });
    return res.json(newSpot)
})

  module.exports = router;