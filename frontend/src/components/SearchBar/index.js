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
    const [showSearchFilter, setShowSearchFilter] = useState(true)

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

    const filteredBySearch = spotsArr.filter(spot => search && spot &&  ((spot.state.toUpperCase().startsWith(search.toUpperCase())) || (STATE_MAP.get(search.toUpperCase()) && (spot.state.toUpperCase() === STATE_MAP.get(search.toUpperCase()).toUpperCase()))))
    // const filteredBySearch = spotsArr.filter(spot => spot.state.toUpperCase() === STATE_MAP.get(search.toUpperCase()).toUpperCase())
    const filteredByRating = filteredBySearch.filter(spot => spot.avgRating ? spot.avgRating > ratingFilter: ((spot.state.toUpperCase().startsWith(search.toUpperCase())) || (STATE_MAP.get(search.toUpperCase()) && (spot.state.toUpperCase() === STATE_MAP.get(search.toUpperCase()).toUpperCase()))))
    const filteredByPrice = filteredByRating.filter(spot => spot.price < priceFilter )

    let searchResults = filteredByPrice
   



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
                                            onChange={e => { setShowSearchFilter(true)
                                                setSearch(e.target.value)}} />
                                        <button className="search-button" type="submit" onClick = {() => { setShowFilter(!showFilter)
                                        setShowSearchFilter(false)
                                            history.push(`/searchresults/${ratingFilter}/${priceFilter}/${search}`)}}><i class="fa fa-search"></i></button>
                                        {/* <div>Over {ratingFilter}</div>
                                        <div>Over {priceFilter}</div> */}

                </div>
        </div>

        <div className = "results-container">
            {showSearchFilter === false || search === '' ? null : 
                    <div className="results-dropdown">
                        {searchResults.length > 0 ? searchResults.map(spot => {
                            return (
                                // <NavLink key={spot.name} to={`/spots/${spot.id}`} onClick = {() => { setSearch('') 
                                //                                                                 setShowFilter(!showFilter)
                                //                                                                 clearSearchFilters()}}>
                                <div className="spot-result" onClick = {() => { history.push(`/spots/${spot.id}`)
                                    setSearch('') 
                                                                                                
                                                                                                clearSearchFilters()}}>
                                    {spot.name} - {spot.state} - <i class="fa-sharp fa-solid fa-star fa-xs"></i>{spot.avgRating} - ${spot.price}
                                </div>
                                // </NavLink>
                            )
                        }): <div className = "spot-result-none">No results found</div>}
                    </div>
                
                
                }
        </div>
        </>
        // </div>

        
    )

}
