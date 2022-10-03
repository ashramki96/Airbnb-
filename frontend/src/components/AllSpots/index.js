import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotDetails from '../SpotDetails';
import CreateSpotForm from '../CreateSpotForm';
import './SpotCard.css'

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
    <div className = 'cardContainer'>
        
            {spotsArr.map(spot => {
                return ( 
                <div className = 'spotCard'>
                <Link key={spot.name} to={`/spots/${spot.id}`}>
                    
                    <div><img className='spotImage' src={spot.previewImage} width="200" height="150"></img></div>
                    <div className = 'spotDeets'>
                    <div className = 'spotName'>{spot.name}</div>
                    <div className = 'spotRating'>★{spot.avgRating}</div>
                    </div>
                    <div className='spotAddress'>{spot.city}, {spot.state}</div>
                    <div classNAme='spotPrice'>${spot.price}</div>
                    
                </Link>
            </div>
                )
            })}
        
        
        
    </div>
    )

}

export default AllSpots