const express = require('express');
const { Spot, Review, ReviewImage, SpotImage, Booking, User, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');
const booking = require('../../db/models/booking');

const router = express.Router();

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

//Get all reviews of current user

router.get('/current', requireAuth, async (req, res) => {
    const {user} = req
    const allReviews = []
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    })  

    for(let i = 0; i<reviews.length; i++){
        const review = reviews[i]
        const spotDetails = await review.getSpot({
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"], raw: true, nest: true
        })

        const imageDetails = await SpotImage.findAll({
            where: {spotId: spotDetails.id, preview: true},
            attributes: ["url"], raw: true, nest: true

        })
        console.log(spotDetails)
        console.log(imageDetails)
        const userDetails = await review.getUser({
            attributes: ["id", "firstName", "lastName"]
        })
        const reviewImageDetails = await ReviewImage.findAll({
            where: {reviewId: review.id},
            attributes: ["id", "url"], raw: true, nest: true

        })
        
    if(spotDetails){
       prevImg = imageDetails[0].url
    } else prevImg = ""

        
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
            },
            ReviewImages: reviewImageDetails

        }
        allReviews.push(reviewDetails)
    }
    res.json({Reviews: allReviews})
})


//Edit a review
router.put('/:reviewid', requireAuth, validateReview, async (req, res) => {
    const {reviewid} = req.params
    const {review, stars} = req.body
    const findReview = await Review.findByPk(+reviewid)
    if(!findReview) {
        res.statusCode = 404
        return res.json({ message: "Review couldn't be found",
    statusCode: 404 })
    }
 
    const updatedReview = await Review.findByPk(reviewid)
    await updatedReview.update({review: review, stars: stars})
    return res.json({
        id: updatedReview.id,
        userId: updatedReview.userId,
        spotId: updatedReview.spotId,
        review: updatedReview.review,
        stars: updatedReview.stars,
        createdAt: updatedReview.createdAt,
        updatedAt: updatedReview.updatedAt
    })
})


//Delete a Review
router.delete('/:reviewid', requireAuth, async (req, res) => {
    const { user } = req
    const { reviewid } = req.params
    const review = await Review.findByPk(reviewid)
    if (!review) {
        res.statusCode = 404
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (user.id !== review.userId) res.json({ message: "Only the reviewer can delete their review" })


    await review.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

})

  module.exports = router;