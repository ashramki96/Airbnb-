import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UpdateSpotForm from '../UpdateSpotForm';
import { deleteSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import AllReviewsSpot from '../AllReviewsSpot';
import CreateReview from '../CreateReview';
import { getSpots, getOneSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import { getbookings } from '../../store/bookings';
import CreateBooking from '../CreateBooking';
import './spotDetails.css'

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

    // useEffect(() => {
    //     console.log("Did this work")
    //     dispatch(getSpots());
    //     dispatch(getReviews(spotId));

    // }, [dispatch, spotId])

    useEffect(() => {
        console.log("Did this work")
        dispatch(getOneSpot(spotId));
        dispatch(getReviews(spotId));
        dispatch(getbookings(spotId));
    }, [spotId])

    
    console.log("SPOT ID IS ", spotId)
    const spotsArr = useSelector(state => Object.values(state.spots))
    console.log("THIS IS THE ARRAY", spotsArr)
    const spot = spotsArr.find(singleSpot => singleSpot.id === +spotId)
    if (!spot) return null
    if(!spot.SpotImages) return null
    const spotOwnerId = spot.ownerId
    console.log("THE SPOT IS", spot)






    // const handleDelete = () => {
    //     const deleteCurrentSpot = dispatch(deleteSpot(spotId)).then(() => dispatch(getSpots()))
    //     history.push(`/`)
    // }

    const handleDelete = () => {
        const deleteCurrentSpot = dispatch(deleteSpot(spotId)).then(() => dispatch(getSpots())).then (() => history.push(`/`))
    }


  


    return (
        <div className = "spotDetails">
            <h1>{spot.name}</h1> {sessionUserId && sessionUserId === spotOwnerId ? 
            <button className = 'deleteSpotButton' onClick={handleDelete}>Delete Spot</button> : null}
            {sessionUserId && sessionUserId === spotOwnerId ? <UpdateSpotForm /> : null}
             <h4><i class="fa-sharp fa-solid fa-star fa-xs"></i> {!spot.avgStarRating ? "0" : spot.avgStarRating} • {reviewsArr.length} reviews • {spot.address}</h4>
            <div><img className = "spotImg" src={spot.SpotImages[0].url}></img></div>
            <div className = "aircoverGrid">

            <div className = "stats-booking">

            <div className = "spotPointsContainer">
            <div className = "hostedBy">Entire spot hosted by {spot.Owner.firstName} {spot.Owner.lastName} </div>
            <div className = "spotStats">4 guests · 3 bedrooms · 1 bed · 1 bath</div>
            {spot.avgStarRating ? <>
            <div className = "spotPoints"> <i class="fa-solid fa-location-dot"></i><span id ="greatLocation">  Great Location</span></div>
            <div className = "belowSpotPoints">90% of recent guests gave the location a 5-star rating</div>
            <div className = "spotPoints"><i class="fa-solid fa-key"></i><span id ="greatCheckin"> Great check-in experience</span></div>
            <div className = "belowSpotPoints">100% of recent guests gave the check-in process a 5-star rating.</div>
            <div className = "spotPoints"><i class="fa-solid fa-calendar"></i> <span id ="freeCancel"> Free cancellation for 48 hours</span></div>
            
            </>
            : null}
            </div>  
            {sessionUserId && sessionUserId !== spotOwnerId ? <div className = "bookings-form"><CreateBooking sessionUser = {sessionUser}/> </div>: null}</div>
            
            <img className = "aircover" src = "https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"></img>
            <div className = "aircoverText">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
            <h4 className = "spotDescription">{spot.description}</h4>
            
           

            <h2><i class="fa-sharp fa-solid fa-star fa-xs"></i> {!spot.avgStarRating ? "0" : spot.avgStarRating} · {reviewsArr.length} Reviews  </h2>
            {sessionUserId && userReview.length === 0 && sessionUserId !== spotOwnerId ? <CreateReview />: null}
            <div>{!spot.avgStarRating ? "This is a brand new spot. No reviews yet!" : <AllReviewsSpot />} </div>
           
        </div>
    )

}


export default SpotDetails


