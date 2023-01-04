import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpots, getOneSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import SpotDetails from '../SpotDetails';
import CreateSpotForm from '../CreateSpotForm';


export default function SearchResults() {

    let {ratingFilter} = useParams()
    let {priceFilter} = useParams()
    const {search} = useParams()
    ratingFilter = parseInt(ratingFilter)
    priceFilter = parseInt(priceFilter)

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)

    const filteredBySearch = spotsArr.filter(spot => spot.state.toUpperCase() === search.toUpperCase())
    const filteredByRating = filteredBySearch.filter(spot => spot.avgRating > ratingFilter)
    const filteredByPrice = filteredByRating.filter(spot => spot.price < priceFilter )

    let searchResults = filteredByPrice

    useEffect(() => {{
        dispatch(getSpots());
    }}, [])

    if(!spots) return null

    return (
        <div>
  {searchResults.length === 0 ? <h2 className = "results-on-search">No results for that search</h2> : <h2 className = "results-on-search">Search Results for "{search}"</h2>}
    <div className = 'cardOuterContainer'>
        <div className='cardInnerContainer'>
        
            {searchResults.map(spot => {
                return ( 
                <div className = 'spotCard'>
                <NavLink key={spot.name} to={`/spots/${spot.id}`}>
                    
                    <div><img className='spotImage' src={spot.previewImage} width="200" height="150"></img></div>
                    <div className = 'spotDeets'>
                    <div className = 'spotName'>{spot.name}</div>
                    <div className = 'spotRating'><div className = "star"><i class="fa-sharp fa-solid fa-star fa-xs"></i></div>  <div className = "avgRating">{!spot.avgRating ? "0" : spot.avgRating}</div></div>
                    </div>
                    <div className='spotAddress'>{spot.city}, {spot.state}</div>
                    <div className='spotPrice'>${spot.price}</div>
                    
                </NavLink>
            </div>
                )
            })}
        
        </div>
        
    </div>
    </div>
    )

}

