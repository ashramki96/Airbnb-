import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getReviews } from '../../store/reviews';
import { deleteReview } from '../../store/reviews';
import { getSpots, getOneSpot } from '../../store/spots';

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
    
    // const deleteThisReview = await dispatch(deleteReview(reviewId)).then (() => dispatch(getSpots()))

    const deleteThisReview = await dispatch(deleteReview(reviewId)).then (() => dispatch(getOneSpot(spotId)))
   }

 


    if(!spot) return null

    return (
        <div className = "reviewsOuterContainer">
        {/* <h2>Reviews:</h2> */}
        {reviews.map((review) => {
            return (
                <div className = "reviewInnerContainer">
                <div className = "reviewer">{review.User.firstName} ★ {review.stars} {sessionUserId === review.userId ? <button className = 'deleteReviewButton' onClick = {() => handleDelete(review.id)}>Delete Review</button> : null}</div>
                <div className = 'review'>{review.review}</div> 
                
                
                </div>
                
            )
        })}
        </div>
    )



}

export default AllReviewsSpot