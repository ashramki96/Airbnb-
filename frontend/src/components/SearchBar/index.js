import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import "./SearchBar.css"

export default function Search() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpots())
        
    }, [dispatch])

    const [search, setSearch] = useState('')
    const [ratingFilter, setRatingFilter] = useState(0)
    const [priceFilter, setPriceFilter] = useState(0)

    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)

    const filteredSpots = (search, ratingFilter, priceFilter) => {
        const filteredBySearch = spotsArr.filter(spot => spot.state === search)
        const filteredByRating = filteredBySearch.filter(spot.avgRating > ratingFilter)
        const filteredByPrice = filteredByRating.filter(spot.price < priceFilter )

        let filteredSpotsArr = filteredByPrice

        return filteredSpotsArr
    }

    const submitHandler = async () => {
        const searchResults = filteredSpots(search, ratingFilter, priceFilter)
    }


}