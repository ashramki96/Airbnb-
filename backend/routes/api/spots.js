const express = require('express');
const { Spot, Review, SpotImage, User, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
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

//Get all spots LAZY loaded
router.get('/', async (req, res) => {
  const allSpots = []
  const spots = await Spot.findAll({
  })
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i]
    const averageRating = await spot.getReviews({
      attributes:
        [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]], raw: true, nest: true
    })
    const imageDetails = await spot.getSpotImages({where: {preview: true}, attributes: ["url"], raw: true, nest: true })
    console.log("image details", imageDetails)

    let prevImg
    if(imageDetails.length>0){
       prevImg = imageDetails[0].url
    } else prevImg = ""

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
      previewImage: prevImg
    }


    allSpots.push(spotDetails)
  }
  res.json(allSpots)
})

//Create a spot
router.post('/', requireAuth, validateSpotInfo, async (req, res) => {
  const { user } = req
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const newSpot = await Spot.create({
    address, city, state, country, lat, lng, name, description, price, ownerId: user.id
  });
  return res.json(newSpot)
})

//Add an image to a spot based on Spot's id
router.post('/:spotid/images', async (req, res) => {
  const { user } = req
  const { url } = req.body
  const { spotid } = req.params
  const spot = await Spot.findByPk(spotid)
  if (spot) {
    if (user.id === spot.ownerId) {
      const newImg = await SpotImage.create({
        url, preview: true, spotId: spotid
      })
      return res.json({ id: newImg.id, url: newImg.url, preview: newImg.preview })
    }
    else res.json({ message: "Only the owner of this spot can add an image" })
  }
  else {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
})

// GET all spots of current user lazy loaded
router.get('/current', requireAuth, async (req, res) => {
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
    const imageDetails = await spot.getSpotImages({where: {preview: true}, attributes: ["url"], raw: true, nest: true })
    console.log("image details", imageDetails)

    let prevImg
    if(imageDetails.length>0){
       prevImg = imageDetails[0].url
    } else prevImg = ""

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
      previewImage: prevImg
    }


    allSpots.push(spotDetails)
  }
  res.json(allSpots)
})



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
router.put('/:spotid', requireAuth, validateSpotInfo, async (req, res) => {
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
router.delete('/:spotid', requireAuth, async (req, res) => {
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

async function startDateCheck(startDate){
  const bookedDates = await Booking.findAll({
    attributes: ["startDate","endDate"], raw: true, nest: true
  })
  for(let i = 0; i<bookedDates.length; i++){
    if(startDate >= Date.parse(bookedDates[i].startDate) && startDate <= Date.parse(bookedDates[i].endDate)) return 1
    else return 0
  }
}

async function endDateCheck(endDate){
  const bookedDates = await Booking.findAll({
    attributes: ["startDate","endDate"], raw: true, nest: true
  })
  for(let i = 0; i<bookedDates.length; i++){
    if(endDate >= Date.parse(bookedDates[i].startDate) && endDate <= Date.parse(bookedDates[i].endDate) ) return 1
    else return 0
  }
}

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotid/bookings', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body
  const { user } = req
  const { spotid } = req.params
  let start = Date.parse(startDate) //324234343242
  let end = Date.parse(endDate) //23434324324
  if (end <= start) {
    res.statusCode = 400
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }
  const spot = await Spot.findByPk(spotid)
  if (spot) {
    if (user.id !== spot.ownerId) {
      // if (startDateCheck(start) < 1 && endDateCheck(end) < 1) {
        const newBooking = await Booking.create({
          spotId: spotid, userId: user.id, startDate, endDate
        })
        return res.json({
          id: newBooking.id,
          spotId: spotid,
          userId: user.id,
          startDate: newBooking.startDate,
          endDate: newBooking.endDate,
          createdAt: newBooking.createdAt,
          updatedAt: newBooking.updatedAt
        })
      }
    //   else if (startDateCheck(start) === 1) {
    //     res.statusCode = 403
    //     return res.json({
    //       message: "Sorry, this spot is already booked for the specified dates",
    //       statusCode: 403,
    //       errors: {
    //         startDate: "Start date conflicts with an existing booking"
    //       }
    //     })
    //   }
    //   else if (endDateCheck(end) === 1) {
    //     res.statusCode = 403
    //     return res.json({
    //       message: "Sorry, this spot is already booked for the specified dates",
    //       statusCode: 403,
    //       errors: {
    //         endDate: "End date conflicts with an existing booking"
    //       }
    //     })
    //   }
    // }
    else return res.json({ message: "Owner cannot make a booking" })
  }
  else {
    res.statusCode = 404
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })

  }
})


  module.exports = router;