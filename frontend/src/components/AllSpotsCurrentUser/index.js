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

    if(!userSpots.length){
        return (
            <>
            <h4>You don't have any spots at the moment. You can make one right now by clicking on 'Become a host' </h4>
            </>
        )
    }

    return (
        <div className = 'cardOuterContainer'>
        <div className='cardInnerContainer'>
            
            {userSpots.map(spot => {
               return (
               <div className = 'spotCard'>
                <Link key={spot.name} to={`/spots/${spot.id}`}>
                    
                    <div><img className='spotImage' src={spot.previewImage} width="200" height="150"></img></div>
                    <div className = 'spotDeets'>
                    <div className = 'spotName'>{spot.name}</div>
                    <div className = 'spotRating'>★<i className="fa-solid fa-star fa-xs"></i>{spot.avgRating}</div>
                    </div>
                    <div className='spotAddress'>{spot.city}, {spot.state}</div>
                    <div classNAme='spotPrice'>${spot.price}</div>
                    
                </Link>
            </div>
               )
            })}
            
            
            
        </div>
        </div>
        )
}


export default AllSpotsCurrentUser