import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotDetails from '../SpotDetails';
import { deleteSpot } from '../../store/spots';

const AllSpotsCurrentUser = () => {


    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id )
    console.log("USER ID is", userId)
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)
    console.log(" ALL SPOTS" , spotsArr)
    const userSpots = spotsArr.filter(spot => spot.ownerId === userId )
    console.log("User's spots are ", userSpots)
   

    useEffect(() => {{
        dispatch(getSpots());
    }}, [dispatch])

    if(!spots) return null


    return (
        <div>
            
            {userSpots.map(spot => {
               return (<Link key={spot.name} to ={`/spots/${spot.id}`}>
            <div><img src = {spot.previewImage} width="200" height="150"></img></div>
               <div>{spot.name}</div>
               <div>{spot.address}</div>
               <div>{spot.rating}</div>
               <div>${spot.price}</div>
               </Link>)
            })}
            
            
            
        </div>
        )
}


export default AllSpotsCurrentUser