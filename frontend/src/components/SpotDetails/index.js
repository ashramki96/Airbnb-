import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';

const SpotDetails = () => {
    const {spotId} = useParams();
    const spot = useSelector(state => state.spot.spotId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])
}

if(!spot) return null

return 