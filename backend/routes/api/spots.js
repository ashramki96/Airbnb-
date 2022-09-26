const express = require('express');
const { Spot, Review, ReviewImage, SpotImage, User, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { body } = require('express-validator');
const { query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');
const { Op } = require('sequelize');



const router = express.Router();

const validateSpotInfo = [
  body('address')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid address.'),
  body('city')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid city.'),
  body('state')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a valid state.'),
  body('country')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid country'),
  body('lat')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid latitude'),
  body('lng')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid longitude'),
  body('name')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name'),
  body('description')
    .isString()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid description'),
  body('price')
    .isFloat()
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid price'),
  handleValidationErrors
];

const validateReview = [
  body('review')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide a valid review.'),
  body('stars')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage('Please provide a valid rating.'),
  handleValidationErrors
];

const validateQueries = [
  query('page')
    .isInt({ min: 0, max: 10 })
    .withMessage('Please provide a valid page'),
  query('size')
    .isInt({ min: 0, max: 10 })
    .withMessage('Please provide a valid size'),
  query('minLat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Please provide a valid minLat value'),
  query('minLng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Please provide a valid minLng value'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Please provide a valid minPrice value'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Please provide a valid maxPrice value')

]


//Get all spots LAZY loaded with Query filters
router.get('/', validateQueries, async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
   // default page and size
   if (!page) page = 1;
   if (!size) size = 20;
   size = parseInt(size)
   page = parseInt(page)
   let where = {}

   if(minLat) where.lat = {[Op.gte]: parseFloat(minLat)}
   if(maxLat) where.lat = {[Op.lte]: parseFloat(maxLat)}
   if(minLng) where.lng = {[Op.gte]: parseFloat(minLng)}
   if(maxLng) where.lng = {[Op.lte]: parseFloat(maxLng)}
   if(minPrice) where.price = {[Op.gte]: parseFloat(minPrice)}
   if(maxPrice) where.price = {[Op.lte]: parseFloat(maxPrice)}
   

   let pagination = {}
    if (page >= 1 && size >= 1) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }


  const allSpots = []
  const spots = await Spot.findAll({
    where,
    ...pagination
  })
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i]
    const averageRating = await spot.getReviews({
      attributes:
        [[sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("stars")),1), "avgStarRating"]], raw: true, nest: true
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
  res.json({Spots: allSpots, page, size })
})

//Get all spots LAZY loaded
// router.get('/', async (req, res) => {
//   const allSpots = []
//   const spots = await Spot.findAll({
//   })
//   for (let i = 0; i < spots.length; i++) {
//     const spot = spots[i]
//     const averageRating = await spot.getReviews({
//       attributes:
//         [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]], raw: true, nest: true
//     })
//     const imageDetails = await spot.getSpotImages({where: {preview: true}, attributes: ["url"], raw: true, nest: true })
//     console.log("image details", imageDetails)

//     let prevImg
//     if(imageDetails.length>0){
//        prevImg = imageDetails[0].url
//     } else prevImg = ""

//     const spotDetails = {
//       id: spot.id,
//       ownerId: spot.ownerId,
//       address: spot.address,
//       city: spot.city,
//       state: spot.state,
//       country: spot.country,
//       lat: spot.lat,
//       lng: spot.lng,
//       name: spot.name,
//       description: spot.description,
//       price: spot.price,
//       createdAt: spot.createdAt,
//       updatedAt: spot.updatedAt,
//       avgRating: averageRating[0].avgStarRating,
//       previewImage: prevImg
//     }


//     allSpots.push(spotDetails)
//   }
//   res.json({Spots: allSpots })
// })

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
router.post('/:spotid/images', requireAuth, async (req, res) => {
  const { user } = req
  const { url, preview } = req.body
  const { spotid } = req.params
  const spot = await Spot.findByPk(spotid)
  if (spot) {
    if (user.id === spot.ownerId) {
      const newImg = await SpotImage.create({
        url, preview: preview, spotId: spotid
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
      res.json({ message: "spot does not exist with this id",
    statusCode: 404})
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
  if (!spot)
    {
      res.statusCode = 404
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
  } 

    if (user.id !== spot.ownerId) {
      //------------------------
      let startDateError = []
      let endDateError = []
      let bothDatesError = []
      const bookedDates = await Booking.findAll({
        attributes:["startDate", "endDate"], raw: true, nest: true
      })
      
      for(let i = 0; i<bookedDates.length; i++){
        if(start >=Date.parse(bookedDates[i].startDate) && start<=Date.parse(bookedDates[i].endDate)) startDateError.push(1)
        else if(end >=Date.parse(bookedDates[i].startDate) && end <=Date.parse(bookedDates[i].endDate)) endDateError.push(1)
        else if(start<=Date.parse(bookedDates[i].startDate) && end>=Date.parse(bookedDates[i].endDate)) bothDatesError.push(1)
      }
      
      //------------------------
      if (bothDatesError.length > 0) {
        res.statusCode = 403
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
      else if (startDateError.length > 0) {
        res.statusCode = 403
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: "Start date conflicts with an existing booking"
          }
        })
      }
      else if (endDateError.length > 0) {
        res.statusCode = 403
        return res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
        
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
   
    else { 
      res.statusCode = 403
      res.json({ message: "Owner cannot make a booking",
    statusCode: 403 })
    }
  
    })

  


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotid/bookings', requireAuth, async (req, res) => {
  const { user } = req
  const { spotid } = req.params
  const allBookings = []
  const bookings = await Booking.findAll({
    where: {
      spotId: spotid
    }
  })
  const spot = await Spot.findByPk(spotid, {
    attributes: ["ownerId"], raw: true, nest: true
  })

  if (!spot) {
    res.statusCode = 404
    return res.json({message: "Spot does not exist with given id"})
  }

  if (user.id === spot.ownerId) {
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i]
      const userDetails = await booking.getUser({
        attributes: ["id", "firstName", "lastName"], raw: true, nest: true
      })

      const bookingDetails = {
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        User: {
          id: userDetails.id,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName
        }
      }
      allBookings.push(bookingDetails)
    }
    return res.json({ Bookings: allBookings })
  }

  else {
    for (let j = 0; j < bookings.length; j++) {
      const booking = bookings[j]
      const bookingDetails = {
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      }

      allBookings.push(bookingDetails)
    }
    return res.json({ Bookings: allBookings })
  }


})

//Create a review for a spot based on spot's id
router.post('/:spotid/reviews', requireAuth, validateReview, async (req, res) => {
  const { user } = req
  const { review, stars } = req.body
  const { spotid } = req.params
  const spot = await Spot.findByPk(spotid)
  const findReview = await Review.findAll({
    where: {spotId: spotid, userId: user.id}
  })

  if(findReview.length > 0){
    res.statusCode = 403
    return res.json({message: "review already exists from current user",
  statusCode: 403})
  }
  if (spot) {
      const newReview = await Review.create({
        review, stars, spotId: spotid, userId: user.id
      })
      return res.json({ id: newReview.id, userId: user.id, spotId: spotid, review: newReview.review, stars: newReview.stars, createdAt: newReview.createdAt, updatedAt: newReview.updatedAt })
    
  }
  else {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
})

//Get all review by a spot's id

router.get('/:spotid/reviews', requireAuth, async (req, res) => {
  const {user} = req
  const {spotid} = req.params
  const spot = await Spot.findByPk(spotid)
  if(!spot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
  const allReviews = []
  const reviews = await Review.findAll({
      where: {
          spotId: spotid
      }
  })  

  for(let i = 0; i<reviews.length; i++){
      const review = reviews[i]
    
      const imageDetails = await SpotImage.findAll({
          where: {spotId: spotid, preview: true},
          attributes: ["url"], raw: true, nest: true

      })
      const userDetails = await review.getUser({
          attributes: ["id", "firstName", "lastName"]
      })
      const reviewImageDetails = await ReviewImage.findAll({
          where: {reviewId: review.id},
          attributes: ["id", "url"], raw: true, nest: true

      })
    

      
      const reviewDetails = {
          id: review.id,
          userId: review.userId,
          spotId: review.spotId,
          review: review.review,
          stars: review.stars,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          User: {
              id: userDetails.id,
              firstName: userDetails.firstName,
              lastName: userDetails.lastName
          },
          ReviewImages: reviewImageDetails

      }
      allReviews.push(reviewDetails)
  }
  res.json({Reviews: allReviews})
})


  module.exports = router;