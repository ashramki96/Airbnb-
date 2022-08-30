const express = require('express');
const { Spot, Review, SpotImage, sequelize} = require('../../db/models');
const { Op } = require("sequelize");


const router = express.Router();

router.get('/', async (req, res) => {
    
      
      const spots = await Spot.findAll({
        group: ["Reviews.spotId", "SpotImages.url"],
        include: [{
            model: Review,
            attributes: []
        },

        {   model: SpotImage,
            attributes: ["url"]
         }],
        attributes: {
        
            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),"avgRating"]],
        },
        
      });
  
      return res.json({
        spots,
      });
    }
  );

  module.exports = router;