import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UpdateSpotForm from '../UpdateSpotForm';
import { deleteSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import AllReviewsSpot from '../AllReviewsSpot';
import CreateReview from '../CreateReview';
import { getSpots } from '../../store/spots';
import { getReviews } from '../../store/reviews';

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();


    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => Object.values(state.reviews))

    let currentUserReviewsArr = []
    let sessionUserId

    if (sessionUser) {
        sessionUserId = sessionUser.id;
        //  let currentUserReviews = reviews.find(review => review.userId === +sessionUserId)
        //  currentUserReviewsArr.push(currentUserReviews)
    }

    const reviewsArr = useSelector(state => Object.values(state.reviews))
    const userReview = reviewsArr.find(singleReview => singleReview.userId === sessionUserId)

    useEffect(() => {
        console.log("Did this work")
        dispatch(getSpots());
        dispatch(getReviews(spotId));
    }, [dispatch, spotId])

    console.log("SPOT ID IS ", spotId)
    const spotsArr = useSelector(state => Object.values(state.spots))
    console.log("THIS IS THE ARRAY", spotsArr)
    const spot = spotsArr.find(singleSpot => singleSpot.id === +spotId)
    if (!spot) return null
    const spotOwnerId = spot.ownerId
    console.log("THE SPOT IS", spot)






    const handleDelete = () => {
        const deleteCurrentSpot = dispatch(deleteSpot(spotId)).then(() => dispatch(getSpots()))
        history.push(`/`)
    }





    return (
        <div>
            <h1>{spot.name}</h1> <h4>★ {!spot.avgRating ? "0" : spot.avgRating}</h4>
            <div><img src={spot.previewImage}></img></div>
            <h2>{spot.description}</h2>
            <h3>{spot.address}</h3>

            <h2>Reviews: </h2>
            <div>{!spot.avgRating ? "Reviews will appear after you've had a booking" : <AllReviewsSpot />} </div>
            {!userReview && sessionUserId && sessionUserId !== spotOwnerId ? <CreateReview /> : null}
            {sessionUserId && sessionUserId === spotOwnerId ? <button onClick={handleDelete}>Delete Spot</button> : null}
            {sessionUserId && sessionUserId === spotOwnerId ? <UpdateSpotForm /> : null}
        </div>
    )

}


export default SpotDetails


