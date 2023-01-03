import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import "./SearchBar.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [search, setSearch] = useState('')
    const [ratingFilter, setRatingFilter] = useState(0)
    const [priceFilter, setPriceFilter] = useState(5000)
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        dispatch(getSpots())
        
    }, [dispatch, search, ratingFilter, priceFilter])

   

    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)

    // const filteredSpots = (search, ratingFilter, priceFilter) => {
    //     const filteredBySearch = spotsArr.filter(spot => spot.state === search)
    //     const filteredByRating = filteredBySearch.filter(spot => spot.avgRating > ratingFilter)
    //     const filteredByPrice = filteredByRating.filter(spot => spot.price < priceFilter )

    //     let filteredSpotsArr = filteredByPrice

    //     return filteredSpotsArr
    // }

    // const submitHandler = async () => {
    //     const searchResults = filteredSpots(search, ratingFilter, priceFilter)
    // }

    // const searchResults = filteredSpots(search, ratingFilter, priceFilter)

  
    const filterSubmitHandler = async () => {
        setShowFilter(!showFilter)
    }

    const filteredBySearch = spotsArr.filter(spot => spot.state.toUpperCase() === search.toUpperCase())
    const filteredByRating = filteredBySearch.filter(spot => spot.avgRating > ratingFilter)
    const filteredByPrice = filteredByRating.filter(spot => spot.price < priceFilter )

    let searchResults = filteredByPrice
    console.log("Spots Array is", spotsArr)
    console.log("Filtered by search", filteredBySearch)
    console.log("Filtered by rating", filteredByRating)
    console.log("Filtered by Price", filteredByPrice)
    console.log("SEARCH RESULTS ARE", searchResults)



    return (
        // <div className = "search-and-results-container">
        <>
        <div className = "search-bar-container">
                <div className='search-bar'>
                    <button className="filter-button" onClick={() => filterSubmitHandler()}><i class="fa fa-light fa-filter"></i></button>
                    {showFilter && !search ?
                        <div className="filter-dropdown">
                        
                        <div className = "filter-container-left">
                          <div className = "filter-options">Under $200/night</div>
                          <div className = "filter-options">Under $400/night</div>
                          <div className = "filter-options">Under $500/night</div>
                        </div>

                        <div className = "filter-container-right">
                          <div className = "filter-options">Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>2</div>
                          <div className = "filter-options">Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>3</div>
                          <div className = "filter-options">Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>4</div>
                        </div>



                        </div> : null}

                                        <input className='search-text'
                                            type="search"
                                            placeholder="What state are you visiting?"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)} />
                                        <button className="search-button" type="submit"><i class="fa fa-search"></i></button>

                </div>
        </div>

        <div className = "results-container">
            {search === '' ? null : 
                    <div className="results-dropdown">
                        {searchResults.map(spot => {
                            return (
                                <NavLink key={spot.name} to={`/spots/${spot.id}`} onClick = {() => setSearch('')}>
                                <div className="spot-result">
                                    {spot.name} - <i class="fa-sharp fa-solid fa-star fa-xs"></i>{spot.avgRating} - ${spot.price}
                                </div>
                                </NavLink>
                            )
                        })}
                    </div>
                
                
                }
        </div>
        </>
        // </div>

        
    )

}