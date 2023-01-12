const express = require('express');
const { Spot, Review, SpotImage, Booking, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');
const booking = require('../../db/models/booking');
const { Op } = require("sequelize");

const router = express.Router();



//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req
  const allBookings = []
  const bookings = await Booking.findAll({
    where: {
      userId: user.id
    }
  })

  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i]
    const spotDetails = await booking.getSpot({
      attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"], raw: true, nest: true
    })
    const imageDetails = await SpotImage.findAll({
      where: { spotId: spotDetails.id, preview: true },
      attributes: ["url"], raw: true, nest: true

    })

    let prevImg
    if (imageDetails.length > 0) {
      prevImg = imageDetails[0].url
    } else prevImg = ""


    const bookingDetails = {
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      Spots: {
        id: spotDetails.id,
        ownerId: spotDetails.ownerId,
        address: spotDetails.address,
        city: spotDetails.city,
        state: spotDetails.state,
        country: spotDetails.country,
        lat: spotDetails.lat,
        lng: spotDetails.lng,
        name: spotDetails.name,
        price: spotDetails.price,
        previewImage: prevImg

      }

    }
    allBookings.push(bookingDetails)
  }
  res.json({ Bookings: allBookings })
})



//Edit a Booking
router.put('/:bookingid', requireAuth, async (req, res) => {
  const { bookingid } = req.params
  const { startDate, endDate } = req.body
  // const { user } = req
  let start = Date.parse(startDate) //324234343242
  let end = Date.parse(endDate) //23434324324
  const booking = await Booking.findByPk(bookingid, {
    attributes: ["startDate", "endDate", "id", "userId", "spotId", "createdAt", "updatedAt"], raw: true, nest: true
  })
  if (!booking) {
    res.statusCode = 404
    return res.json({
      message: "Booking does not exist with given id",
      statusCode: 404
    })
  }
  if (start < Date.parse(new Date())) {
    res.statusCode = 403
    return res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  if (end <= start) {
    res.statusCode = 400
    return res.json({
      message: "End date cannot be before the Start date",
      statusCode: 400,
      errors: {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

  let startDateError = []
  let endDateError = []
  let bothDatesError = []
  //has to be in spot routes so it's based on one spot not all spot bookings
  const bookedDates = await Booking.findAll({
    attributes: ["startDate", "endDate"], raw: true, nest: true,
    where: {
      id:{
        [Op.not]: booking.id
      }
    }
  })

  

  for (let i = 0; i < bookedDates.length; i++) {
    if (start >= Date.parse(bookedDates[i].startDate) && start <= Date.parse(bookedDates[i].endDate)) startDateError.push(1)
    else if (end >= Date.parse(bookedDates[i].startDate) && end <= Date.parse(bookedDates[i].endDate)) endDateError.push(1)
    else if (start <= Date.parse(bookedDates[i].startDate) && end >= Date.parse(bookedDates[i].endDate)) bothDatesError.push(1)
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
  if (startDateError.length > 0) {
    res.statusCode = 403
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking"
      }
    })
  }
  if (endDateError.length > 0) {
    res.statusCode = 403
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        endDate: "End date conflicts with an existing booking"
      }
    })
  }
  else {
    const updatedBooking = await Booking.findByPk(bookingid)

    await updatedBooking.update({ startDate: startDate, endDate: endDate })
    return res.json({
      id: updatedBooking.id,
      userId: updatedBooking.userId,
      spotId: updatedBooking.spotId,
      startDate: updatedBooking.startDate,
      endDate: updatedBooking.endDate,
      createdAt: updatedBooking.createdAt,
      updatedAt: updatedBooking.updatedAt
    })
  }
})


//Delete a Booking
router.delete('/:bookingid', requireAuth, async (req, res) => {
  const { bookingid } = req.params
  const booking = await Booking.findByPk(bookingid)
  if (booking) {
    await booking.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
  else {
    res.statusCode = 404
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }
})

module.exports = router;