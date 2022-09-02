const express = require('express');
const { Spot, Review, ReviewImage, SpotImage, User, Booking, sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const user = require('../../db/models/user');

const router = express.Router();

//Delete a review image
router.delete('/:reviewImagesid', requireAuth, async (req, res) => {
    const { reviewImagesid } = req.params
    const {user} = req
    const reviewImage = await ReviewImage.findByPk(reviewImagesid)
    if (!reviewImage) {
        res.statusCode = 404
        res.json({
            message: "Review image couldn't be found",
            statusCode: 404
        })
    }
    const review = await reviewImage.getReview({
        attributes: ["userId"]
    })
    if(user.id !== review.userId) res.json({message: "Only the owner of the review can delete a review image"})
    
    await reviewImage.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
  })

module.exports = router;