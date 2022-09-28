import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getReviews } from '../../store/reviews';
import { deleteReview } from '../../store/reviews';
import { getSpots } from '../../store/spots';

const AllReviewsSpot = () => {
    const sessionUser = useSelector(state => state.session.user)
    let sessionUserId
    if(sessionUser) {
         sessionUserId = sessionUser.id;
    }
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
    
    const deleteThisReview = await dispatch(deleteReview(reviewId)).then (() => dispatch(getSpots()))
   }

 


    if(!spot) return null

    return (
        <div>
        {/* <h2>Reviews:</h2> */}
        {reviews.map((review) => {
            return (
                <>
                <div>review: {review.review}</div>
                <div>stars: {review.stars}</div>
                {sessionUserId === review.userId ? <button onClick = {() => handleDelete(review.id)}>Delete Review</button> : null}
                
                </>
                
            )
        })}
        </div>
    )



}

export default AllReviewsSpot