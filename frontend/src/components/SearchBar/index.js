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

    // const twoPrice = document.getElementById('two-price')
    // const fourPrice = document.getElementById('four-price')
    // const fivePrice = document.getElementById('five-price')

    // const twoRating = document.getElementById('two-rating')
    // const threeRating = document.getElementById('three-rating')
    // const fourRating = document.getElementById('four-rating')

    // twoPrice.addEventListener('click', function onClick(event) {
    //     event.target.style.backgroundColor = 'red';

    //     event.target.style.color = 'white';
    //   });
 
    const clearSearchFilters = async () => {
        setRatingFilter(0)
        setPriceFilter(5000)
    }
  
    const filterSubmitHandler = async () => {
        setShowFilter(!showFilter)
        setSearch("")
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
                    <div className = "filter-dropdown">
                        <div className="filter-dropdown-inner">
                        
                        <div className = "filter-container-left">
                        <div className = "filter-title">Price</div>
                          {priceFilter !== 200 ? <div id = "two-price" className = "filter-options" onClick={() => setPriceFilter(200)}>Under $200/night</div> : <div id = "two-price" className = "filter-options-selected" onClick={() => setPriceFilter(200)}>Under $200/night</div>}
                          {priceFilter !== 400 ? <div id = "four-price" className = "filter-options" onClick={() => setPriceFilter(400)}>Under $400/night</div> : <div id = "four-price" className = "filter-options-selected" onClick={() => setPriceFilter(400)}>Under $400/night</div>}
                          {priceFilter !== 500 ? <div id = "five-price" className = "filter-options" onClick={() => setPriceFilter(500)}>Under $500/night</div> : <div id = "five-price" className = "filter-options-selected" onClick={() => setPriceFilter(500)}>Under $500/night</div>}
                        </div>

                        <div className = "filter-container-right">
                        <div className = "filter-title">Ratings</div>
                          {ratingFilter !== 2 ? <div id = "two-rating" className = "filter-options" onClick={() => setRatingFilter(2)}>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>2</div> : <div id = "two-rating" className = "filter-options-selected" onClick={() => setRatingFilter(2)}>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>2</div>}
                          {ratingFilter !== 3 ? <div id = "three-rating" className = "filter-options" onClick={() => setRatingFilter(3)}>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>3</div> : <div id = "three-rating" className = "filter-options-selected" onClick={() => setRatingFilter(3)}>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>3</div>}
                          {ratingFilter !== 4 ? <div id = "four-rating" className = "filter-options" onClick={() => setRatingFilter(4)}>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>4</div> :  <div id = "four-rating" className = "filter-options-selected" onClick={() => setRatingFilter(4)}>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>4</div>}
                        </div>

                        
                        
                        </div>

                        
                        {/* <div className = "current-filters">Filters Selected: {ratingFilter === 0 && priceFilter === 5000 ? <>None</> : <>Over <i class="fa-sharp fa-solid fa-star fa-xs"></i>{ratingFilter} and Under ${priceFilter}</>} </div> */}
                        
                        <div className = "clear-filters" onClick = {() => clearSearchFilters()}>Clear Search Filters</div>
                        </div> : null}

                                        <input className='search-text'
                                            type="search"
                                            placeholder="What state are you visiting?"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)} />
                                        <button className="search-button" type="submit"><i class="fa fa-search"></i></button>
                                        {/* <div>Over {ratingFilter}</div>
                                        <div>Over {priceFilter}</div> */}

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