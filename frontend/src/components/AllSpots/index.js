import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotDetails from '../SpotDetails';
import CreateSpotForm from '../CreateSpotForm';

const AllSpots = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    console.log( "SPOTS", spots)
    const spotsArr = Object.values(spots)
    console.log(" ALL SPOTS" , spotsArr)

    useEffect(() => {{
        dispatch(getSpots());
    }}, [dispatch])

    if(!spots) return null

    return (
    <div>
        
        {spotsArr.map(spot => {
           return (<Link key={spot.name} to ={`/spots/${spot.id}`}>
           <div>{spot.name}</div>
           <div>{spot.address}</div>
           <div>{spot.rating}</div>
           <div>${spot.price}</div>
           </Link>)
        })}
        
        
        
    </div>
    )

}

export default AllSpots