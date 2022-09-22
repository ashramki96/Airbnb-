import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotDetails from '../SpotDetails';

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
        <h2>Current user's spots are: </h2>

        

        {userSpots.map(userSpot => {
           return (
           <Link key={userSpot.name} to ={`/spots/${userSpot.id}`}>
           <div>{userSpot.name}</div>
           </Link>
           )
        })}


        
        
        
    </div>
    )

}


export default AllSpotsCurrentUser