const express = require('express');
const { Spot, Review, SpotImage, User, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { JsonWebTokenError } = require('jsonwebtoken');
const user = require('../../db/models/user');


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

//Get all spots
router.get('/', async (req, res) => {

    const spots = await Spot.findAll({
        group: ["Reviews.spotId", "SpotImages.url"],
        include: [{
            model: Review,
            attributes: []
        },

        {
            model: SpotImage,
            attributes: ["url"],
        }],
        attributes: {

            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
        },

    });
    return res.json({
        spots,
    });
});

//Create a spot
router.post('/', validateSpotInfo, async (req, res) => {
    const {user} = req
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price, ownerId: user.id
    });
    return res.json(newSpot)
})

//Add an image to a spot based on Spot's id
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

// Get all spots owned by the current user
router.get('/current', async (req, res) => {
  const {user} = req
  const spots = await Spot.findAll({
    where: {
      ownerId: user.id
    },
    group: ["Reviews.spotId", "SpotImages.url"],
        include: [{
            model: Review,
            attributes: []
        },

        {
            model: SpotImage,
            attributes: ["url"],
        }],
        attributes: {

            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
        },
  })

    return res.json(spots)
  })


//Get details for a spot from an id
router.get('/:spotid', async (req, res) => {
  const { spotid } = req.params
  const numberReviews = await Review.count({
    where: {
      spotId: spotid
    }
  })
  console.log("number of reviews : ", numberReviews)
  const spot = await Spot.findByPk(spotid, {
    
    include: [{
      model: Review,
      attributes: []
    },
    {
      model: SpotImage,
      attributes: ["id", "url", "preview"]
    },
    {
      model: User,
      attributes: ["id", "firstName", "lastName"]
    }],

    attributes: {
      include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]],
    },
  
  })
  let newSpot = spot.toJSON()
  newSpot.numReviews = numberReviews
  console.log(spot)
  if (spot) return res.json(newSpot)
  else {
    res.statusCode = 404
    res.json({ message: "spot does not exist with this id" })
  }
})
//Edit a spot
router.put('/:spotid', validateSpotInfo, async (req, res) => {
  const { spotid } = req.params
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const spot = await Spot.findByPk(spotid)
    if(address){
      spot.address = address
    }
    if(city){
      spot.city = city
    }
    if(state){
      spot.state = state
    }
    if(country){
      spot.country = country
    }
    if(lat){
      spot.lat = lat
    }
    if(lng){
      spot.lng = lng
    }
    if(name){
      spot.name = name
    }
    if(description){
      spot.descriptio = description
    }
    if(price){
      spot.price = price
    }

    await spot.save()

    if(spot) res.json(spot)
    else {
      res.statusCode = 404
      res.json({ message: "spot does not exist with this id" })
    }
  

})

//Delete a spot


  module.exports = router;