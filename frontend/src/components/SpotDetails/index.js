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
    const history = useHistory()
    const { spotId } = useParams();
    console.log("SPOT ID IS ", spotId)
    const spotsArr = useSelector(state => Object.values(state.spots))
    const spot = spotsArr.find(singleSpot => singleSpot.id === +spotId)
    console.log("THE SPOT IS", spot)


    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch, spotId])


    if (!spot) return null

    


    const handleDelete = () => {
        const deleteCurrentSpot = dispatch(deleteSpot(spotId)).then(() => dispatch(getSpots()))
        history.push(`/`)
    }

    

   

    return (
        <div>
        <h1>{spot.name}</h1> <h4>★ {!spot.avgRating ? "0" : spot.avgRating}</h4>
        <div><img src = {spot.previewImage}></img></div>
        <h2>{spot.description}</h2>
        <h3>{spot.address}</h3>
        
        
        <AllReviewsSpot />
        <CreateReview />
        <button onClick = {handleDelete}>Delete Spot</button>
        <UpdateSpotForm />
        </div>
    )

}


export default SpotDetails
