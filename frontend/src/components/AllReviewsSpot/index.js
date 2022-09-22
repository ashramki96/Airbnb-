import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getReviews } from '../../store/reviews';
import { deleteReview } from '../../store/reviews';

const AllReviewsSpot = () => {
    
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const spotsArr = useSelector(state => Object.values(state.spots))
    const spot = spotsArr.find(singleSpot => singleSpot.id === +spotId)

    console.log("REVIEWS, this spot is", spot)

   useEffect(() => {
    dispatch(getReviews(spotId))
   }, [dispatch, spotId])
    
   const allReviews = useSelector(state => Object.values(state.reviews))
   const reviews = allReviews.filter(review => review.spotId === +spotId)
   console.log("REVIEWS ARE ", reviews)

   const handleDelete = async (reviewId) => {
    
    const deleteThisReview = await dispatch(deleteReview(reviewId))
   }


    if(!spot) return null

    return (
        <div>
        <h2>Reviews:</h2>
        {reviews.map((review) => {
            return (
                <>
                <div>review: {review.review}</div>
                <div>stars: {review.stars}</div>
                <button onClick = {() => handleDelete(review.id)}>Delete Review</button>
                </>
                
            )
        })}
        </div>
    )



}

export default AllReviewsSpot