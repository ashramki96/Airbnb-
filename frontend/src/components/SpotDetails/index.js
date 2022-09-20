import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';

const SpotDetails = () => {
    const { spotId } = useParams();
    console.log("SPOT ID IS ", spotId)
    const spotsArr = useSelector(state => Object.values(state.spots))
    const spot = spotsArr.find(singleSpot => singleSpot.id === +spotId)
    console.log("THE SPOT IS", spot)
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getOneSpot(spotId))
    // }, [dispatch, spotId])


    if (!spot) return null

    return (
        <h1>{spot.name}</h1>
    )

}


export default SpotDetails