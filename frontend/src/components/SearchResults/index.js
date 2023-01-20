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


    let STATE_MAP = new Map()
    STATE_MAP.set("AL", "Alabama");
    STATE_MAP.set("AK", "Alaska");
    STATE_MAP.set("AB", "Alberta");
    STATE_MAP.set("AZ", "Arizona");
    STATE_MAP.set("AR", "Arkansas");
    STATE_MAP.set("BC", "British Columbia");
    STATE_MAP.set("CA", "California");
    STATE_MAP.set("CO", "Colorado");
    STATE_MAP.set("CT", "Connecticut");
    STATE_MAP.set("DE", "Delaware");
    STATE_MAP.set("DC", "District Of Columbia");
    STATE_MAP.set("FL", "Florida");
    STATE_MAP.set("GA", "Georgia");
    STATE_MAP.set("GU", "Guam");
    STATE_MAP.set("HI", "Hawaii");
    STATE_MAP.set("ID", "Idaho");
    STATE_MAP.set("IL", "Illinois");
    STATE_MAP.set("IN", "Indiana");
    STATE_MAP.set("IA", "Iowa");
    STATE_MAP.set("KS", "Kansas");
    STATE_MAP.set("KY", "Kentucky");
    STATE_MAP.set("LA", "Louisiana");
    STATE_MAP.set("ME", "Maine");
    STATE_MAP.set("MB", "Manitoba");
    STATE_MAP.set("MD", "Maryland");
    STATE_MAP.set("MA", "Massachusetts");
    STATE_MAP.set("MI", "Michigan");
    STATE_MAP.set("MN", "Minnesota");
    STATE_MAP.set("MS", "Mississippi");
    STATE_MAP.set("MO", "Missouri");
    STATE_MAP.set("MT", "Montana");
    STATE_MAP.set("NE", "Nebraska");
    STATE_MAP.set("NV", "Nevada");
    STATE_MAP.set("NB", "New Brunswick");
    STATE_MAP.set("NH", "New Hampshire");
    STATE_MAP.set("NJ", "New Jersey");
    STATE_MAP.set("NM", "New Mexico");
    STATE_MAP.set("NY", "New York");
    STATE_MAP.set("NF", "Newfoundland");
    STATE_MAP.set("NC", "North Carolina");
    STATE_MAP.set("ND", "North Dakota");
    STATE_MAP.set("NT", "Northwest Territories");
    STATE_MAP.set("NS", "Nova Scotia");
    STATE_MAP.set("NU", "Nunavut");
    STATE_MAP.set("OH", "Ohio");
    STATE_MAP.set("OK", "Oklahoma");
    STATE_MAP.set("ON", "Ontario");
    STATE_MAP.set("OR", "Oregon");
    STATE_MAP.set("PA", "Pennsylvania");
    STATE_MAP.set("PE", "Prince Edward Island");
    STATE_MAP.set("PR", "Puerto Rico");
    STATE_MAP.set("QC", "Quebec");
    STATE_MAP.set("RI", "Rhode Island");
    STATE_MAP.set("SK", "Saskatchewan");
    STATE_MAP.set("SC", "South Carolina");
    STATE_MAP.set("SD", "South Dakota");
    STATE_MAP.set("TN", "Tennessee");
    STATE_MAP.set("TX", "Texas");
    STATE_MAP.set("UT", "Utah");
    STATE_MAP.set("VT", "Vermont");
    STATE_MAP.set("VI", "Virgin Islands");
    STATE_MAP.set("VA", "Virginia");
    STATE_MAP.set("WA", "Washington");
    STATE_MAP.set("WV", "West Virginia");
    STATE_MAP.set("WI", "Wisconsin");
    STATE_MAP.set("WY", "Wyoming");
    STATE_MAP.set("YT", "Yukon Territory");
    
    // const filteredBySearch = spotsArr.filter(spot => spot.state.toUpperCase() === search.toUpperCase())
    // const filteredByRating = filteredBySearch.filter(spot => spot.avgRating > ratingFilter)
    const filteredBySearch = spotsArr.filter(spot => search && spot &&  ((spot.state.toUpperCase().startsWith(search.toUpperCase())) || (STATE_MAP.get(search.toUpperCase()) && (spot.state.toUpperCase() === STATE_MAP.get(search.toUpperCase()).toUpperCase()))))
    // const filteredBySearch = spotsArr.filter(spot => spot.state.toUpperCase() === STATE_MAP.get(search.toUpperCase()).toUpperCase())
    const filteredByRating = filteredBySearch.filter(spot => spot.avgRating ? spot.avgRating > ratingFilter: ((spot.state.toUpperCase().startsWith(search.toUpperCase())) || (STATE_MAP.get(search.toUpperCase()) && (spot.state.toUpperCase() === STATE_MAP.get(search.toUpperCase()).toUpperCase()))))
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

