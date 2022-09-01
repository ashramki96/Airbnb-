const express = require('express');
const { Spot, Review, SpotImage, User, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { JsonWebTokenError } = require('jsonwebtoken');
const user = require('../../db/models/user');


const router = express.Router();

const validateSpotInfo = [
  check('address')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid address.'),
  check('city')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid city.'),
  check('state')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a valid state.'),
  check('country')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid country'),
  check('lat')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid latitude'),
  check('lng')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid longitude'),
  check('name')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name'),
  check('description')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid description'),
  check('price')
    .isFloat()
    .exists({ checkFalsy: true })
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
      where: {preview: true}
    }],
    attributes: {

      include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
    },

    

  });
 
  for(let i = 0; i<spots.length; i++){
    console.log(spots[i])
    let getSpot = spots[i].toJSON()
    if(getSpot.SpotImages.length>0){
      getSpot.previewImage = getSpot.SpotImages[0].url
    }
    else getSpot.previewImage = ""
    
    delete getSpot.SpotImages
    spots[i] = getSpot
  }
  return res.json({
    spots,
  });
});

//Create a spot
router.post('/', validateSpotInfo, async (req, res) => {
  const { user } = req
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const newSpot = await Spot.create({
    address, city, state, country, lat, lng, name, description, price, ownerId: user.id
  });
  return res.json(newSpot)
})

//Add an image to a spot based on Spot's id
// router.post('/:spotid/images', async (req, res) => {
//   const { user } = req
//   const { url } = req.body
//   const { spotid } = req.params
//   const spot = await Spot.findByPk(spotid)
//   if (spot) {
//     if (user.id === spot.ownerId) {
//       const newImg = await SpotImage.create({
//         url, preview: true, spotId: spotid
//       })
//       return res.json({ id: newImg.id, url: newImg.url, preview: newImg.preview })
//     }
//     else res.json({ message: "Only the owner of this spot can add an image" })
//   }
//   else {
//     res.statusCode = 404
//     res.json({
//       message: "Spot couldn't be found",
//       statusCode: 404
//     })
//   }
// })

// // Get all spots owned by the current user
// router.get('/current', async (req, res) => {
//   const { user } = req
//   const spots = await Spot.findAll({
//     where: {
//       ownerId: user.id
//     },
//     group: ["Reviews.spotId", "SpotImages.url"],
//     include: [{
//       model: Review,
//       attributes: []
//     },

//     {
//       model: SpotImage,
//       attributes: ["url"],
//       where: { preview: true }

//     }],
//     attributes: {

//       include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
//     },
//   })

//   for (let i = 0; i < spots.length; i++) {
//     let getSpot = spots[i].toJSON()
//     if (getSpot.SpotImages.length > 0) {
//       getSpot.previewImage = getSpot.SpotImages[0].url
//     }
//     else getSpot.previewImage = ""

//     delete getSpot.SpotImages
//     spots[i] = getSpot
//   }

//   return res.json(spots)
// })

// GET all spots of current user lazy loaded
router.get('/current', async (req, res) => {
  const { user } = req
  const allSpots = []
  const spots = await Spot.findAll({
    where: {
      ownerId: user.id
    },
  })
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i]
    const averageRating = await spot.getReviews({
      attributes:
        [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]], raw: true, nest: true
    })
    const imageDetails = await spot.getSpotImages({ attributes: ["url"], raw: true, nest: true })
    console.log("image details", imageDetails)
    const spotDetails = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: averageRating[0].avgStarRating,
      previewImage: imageDetails[0].url
    }


    allSpots.push(spotDetails)
  }
  res.json(allSpots)
})

//Get details for a spot from an id EAGER LOADED **issues with error handling**
// router.get('/:spotid', async (req, res) => {
//   const { spotid } = req.params
  
  
//   const spot = await Spot.findByPk(spotid, {

//     include: [{
//       model: Review,
//       attributes: []
//     },
//     {
//       model: SpotImage,
//       attributes: ["id", "url", "preview"]
//     },
//     {
//       model: User,
//       attributes: ["id", "firstName", "lastName"]
//     }],

//     attributes: {
//       include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]],
//     },

//   })
//   if (spot) {
//     console.log(spot)
//     const numberReviews = await Review.count({
//       where: {
//         spotId: spotid
//       }
//     })
//     let newSpot = spot.toJSON()
//     newSpot.numReviews = numberReviews
//     return res.json(newSpot)
//   }


//   else {
//     res.statusCode = 404
//     res.json({ message: "spot does not exist with this id" })
//   }

// })

//GET details for a spot from an id LAZY LOADED
router.get('/:spotid', async (req, res) => {
  const { spotid } = req.params
  const spot = await Spot.findByPk(spotid);
  if(spot){
  const imageDetails = await spot.getSpotImages({ attributes: ["id", "url", "preview"] })
  const userDetails = await spot.getUser({ attributes: ["id", "firstName", "lastName"] })
  const reviewDetails = await spot.getReviews({
    attributes:
      [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]],
    raw: true, nest: true
  })
  const numberReviews = await Review.count({
    where: {
      spotId: spotid
    }
  })

  const details = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    SpotImages: imageDetails,
    Owner: userDetails,
    avgStarRating: reviewDetails[0].avgStarRating,
    numReviews: numberReviews
  }
  return res.json(details)
}
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
  if(spot){
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
      spot.description = description
    }
    if(price){
      spot.price = price
    }

    await spot.save()
    res.json(spot)
  }
    else {
      res.statusCode = 404
      res.json({ message: "spot does not exist with this id" })
    }
  

})

//Delete a spot
router.delete('/:spotid', async (req, res) => {
  const { spotid } = req.params
  const spot = await Spot.findByPk(spotid)
  if (spot) {
    await spot.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
  else {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
})


  module.exports = router;