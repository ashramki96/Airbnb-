const express = require('express');
const { Spot, Review, SpotImage, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSpotInfo = [
    check('address')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid address.'),
    check('city')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid city.'),
    check('state')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid state.'),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Please provide a valid country'),
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
      .withMessage('Please provide a valid name'),
    check('description')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid description'),
    check('price')
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage('Please provide a valid price'),
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

router.post('/', validateSpotInfo, async (req, res) => {
    const {user} = req
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId: user.id
    });
    return res.json(newSpot)
})

router.post('/:spotid/images', async (req, res) => {
    const {user} = req
    const {url} = req.body
    const {spotid} = req.params
    const spot = await Spot.findByPk(spotid)
    if (spot) {
        if (user.id === spot.ownerId) {
            const newImg = await SpotImage.create({
                url, preview: true, spotId: spotid
            })
            return res.json({ id: newImg.id, url: newImg.url, preview: newImg.preview })
        }
        else res.json({message: "Only the owner of this spot can add an image"})
    }
    else {
        res.statusCode = 404
        res.json({message: "Couldn't find spot"})
    }
})

  module.exports = router;