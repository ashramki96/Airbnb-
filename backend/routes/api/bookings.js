const express = require('express');
const { Spot, Review, SpotImage, Booking, User, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');
const booking = require('../../db/models/booking');

const router = express.Router();



//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req
    const allBookings = []
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        }
    })  

    for(let i = 0; i<bookings.length; i++){
        const booking = bookings[i]
        const spotDetails = await booking.getSpot({
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"], raw: true, nest: true
        })
        const imageDetails = await SpotImage.findAll({
            where: {spotId: spotDetails.id, preview: true},
            attributes: ["url"], raw: true, nest: true

        })

    let prevImg
    if(imageDetails.length>0){
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
    res.json(allBookings)
})

//Get all Bookings for a Spot based on the Spot's id

//Edit a Booking

//Delete a Booking

module.exports = router;