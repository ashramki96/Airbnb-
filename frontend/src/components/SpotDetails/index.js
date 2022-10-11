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

    const allReviewsArr = useSelector(state => Object.values(state.reviews))
    const reviewsArr = allReviewsArr.filter(review => review.spotId === +spotId)
    const userReview = reviewsArr.filter(singleReview => singleReview.userId === sessionUserId)

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


    // !userReview && 


    return (
        <div className = "spotDetails">
            <h1>{spot.name}</h1> {sessionUserId && sessionUserId === spotOwnerId ? 
            <button onClick={handleDelete}>Delete Spot</button> : null}
            {sessionUserId && sessionUserId === spotOwnerId ? <UpdateSpotForm /> : null}
             <h4>★ {!spot.avgRating ? "0" : spot.avgRating} • {reviewsArr.length} reviews • {spot.address}</h4>
            <div><img className = "spotImg" src={spot.previewImage}></img></div>
            <div className = "aircoverGrid">
            <div className = "hostedBy">Entire spot hosted by Michael Myers</div>
            <div className = "spotStats">4 guests · 3 bedrooms · 1 bed · 1 bath</div>
            <img className = "aircover" src = "https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"></img>
            <div className = "aircoverText">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
            <h4 className = "spotDescription">{spot.description}</h4>
            
           

            <h2>★ {!spot.avgRating ? "0" : spot.avgRating} • {reviewsArr.length} Reviews: </h2>
            <div>{!spot.avgRating ? "This is a brand new spot. No reviews yet!" : <AllReviewsSpot />} </div>
            {sessionUserId && userReview.length === 0 && sessionUserId !== spotOwnerId ? <CreateReview />: null}
        </div>
    )

}


export default SpotDetails


