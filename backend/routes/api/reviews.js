const express = require('express');
const { Spot, Review, ReviewImage, SpotImage, Booking, User, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');
const booking = require('../../db/models/booking');

const router = express.Router();

//Add an image to a Review based on Review's id
router.post('/:reviewid/images', requireAuth, async (req, res) => {
    const { user } = req
    const { url } = req.body
    const { reviewid } = req.params
    const findReview = await Review.findByPk(reviewid)
    if (!findReview) {
        res.statusCode = 404
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (user.id !== findReview.userId) return res.json('Only the person that wrote the review can add images')
    const reviewImages = await ReviewImage.findAll({ where: { reviewId: reviewid } })
    if (reviewImages.length === 10) {
        res.statusCode = 403
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }


    const newImg = await ReviewImage.create({
        url, reviewId: reviewid
    })
    return res.json({ id: newImg.id, url: url })

})

// router.get('/current', requireAuth, async (req, res) => {
//     const {user} = req
//     const allReviews = []
//     const reviews = await Review.findAll({
//         where: {
//             userId: user.id
//         }
//     })  

//     for(let i = 0; i<bookings.length; i++){
//         const booking = bookings[i]
//         const spotDetails = await booking.getSpot({
//             attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"], raw: true, nest: true
//         })
//         const imageDetails = await SpotImage.findAll({
//             where: {spotId: spotDetails.id, preview: true},
//             attributes: ["url"], raw: true, nest: true

//         })

//     let prevImg
//     if(imageDetails.length>0){
//        prevImg = imageDetails[0].url
//     } else prevImg = ""

        
//         const bookingDetails = {
//             id: booking.id,
//             spotId: booking.spotId,
//             userId: booking.userId,
//             startDate: booking.startDate,
//             endDate: booking.endDate,
//             createdAt: booking.createdAt,
//             updatedAt: booking.updatedAt,
//             Spots: {
//                 id: spotDetails.id,
//                 ownerId: spotDetails.ownerId,
//                 address: spotDetails.address,
//                 city: spotDetails.city,
//                 state: spotDetails.state,
//                 country: spotDetails.country,
//                 lat: spotDetails.lat,
//                 lng: spotDetails.lng,
//                 name: spotDetails.name,
//                 price: spotDetails.price,
//                 previewImage: prevImg
                
//             }

//         }
//         allBookings.push(bookingDetails)
//     }
//     res.json({Bookings: allBookings})
// })

  module.exports = router;