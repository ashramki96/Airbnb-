import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotDetails from '../SpotDetails';
import { deleteSpot } from '../../store/spots';

const AllSpotsCurrentUser = () => {


    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id )
    
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)
    
    const userSpots = spotsArr.filter(spot => spot.ownerId === userId )
    
   

    useEffect(() => {{
        dispatch(getSpots());
    }}, [dispatch])

    if(!spots) return null

    if(!userSpots.length){
        return (
            <>
            <h3 className = "noSpots">You don't have any spots at the moment. Start your journey with us by clicking on 'Become a host'</h3>
            <img className = "balloonPic" src = "https://media.cntraveler.com/photos/605961ae7b588da524cfef44/master/w_2580%2Cc_limit/Cappadocia-GettyImages-166186583.jpg"></img>
            </>
        )
    }

    return (
        <>
        <h1 className = "mySpots">My Spots</h1>
        <div className = 'cardOuterContainer'>
        <div className='cardInnerContainer'>
            
            {userSpots.map(spot => {
               return (
               <div className = 'spotCard'>
                <Link key={spot.name} to={`/spots/${spot.id}`}>
                    
                    <div><img className='spotImage' src={spot.previewImage} width="200" height="150"></img></div>
                    <div className = 'spotDeets'>
                    <div className = 'spotName'>{spot.name}</div>
                    <div className = 'spotRating'><div className = "star"><i class="fa-sharp fa-solid fa-star fa-xs"></i></div>  <div className = "avgRating">{!spot.avgRating ? "0" : spot.avgRating}</div></div>
                    </div>
                    <div className='spotAddress'>{spot.city}, {spot.state}</div>
                    <div className='spotPrice'>${spot.price}</div>
                    
                </Link>
            </div>
               )
            })}
            
            
            
        </div>
        </div>
        </>
        )
}


export default AllSpotsCurrentUser