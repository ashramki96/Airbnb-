import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateSpot } from '../../store/spots';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots, getOneSpot } from '../../store/spots';


const UpdateSpotForm = ({closeProp}) => {
  const { spotId } = useParams()
  console.log("update is being rendered")
  const spotsArr = useSelector(state => Object.values(state.spots))
  const currentSpot = spotsArr.find(singleSpot => singleSpot.id === +spotId)
  console.log("THE CURRENT SPOT IS", currentSpot)


  const dispatch = useDispatch();

  const [address, setAddress] = useState(currentSpot.address)
  const [city, setCity] = useState(currentSpot.city)
  const [country, setCountry] = useState(currentSpot.country)
  const [description, setDescription] = useState(currentSpot.description)
  const [lat, setLat] = useState(currentSpot.lat)
  const [lng, setLng] = useState(currentSpot.lng)
  const [name, setName] = useState(currentSpot.name)
  const [price, setPrice] = useState(currentSpot.price)
  const [state, setState] = useState(currentSpot.state)
  const [validationErrors, setValidationErrors] = useState([])

  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateLat = (e) => setLat(e.target.value)
  const updateLng = (e) => setLng(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateState = (e) => setState(e.target.value)


  useEffect(() => {

    const errors = []
    if(lat > 90 || lat < -90) errors.push("Please provide a valid latitude")
    if(lng > 180 || lng < -180) errors.push("Please provide a valid longitude")
    if(price < 0 ) errors.push("Minimum charge can't be less than $0")
    if(description.length > 254) errors.push("Description can't be longer than 255 characters")

    setValidationErrors(errors)
    dispatch(getOneSpot(spotId))
  }, [lat, lng, price, description])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...currentSpot,
      address,
      city,
      country,
      description,
      lat,
      lng,
      name,
      price,
      state
    }
    const updatedSpot = await dispatch(updateSpot(payload))
    // dispatch(getSpots())
    dispatch(getOneSpot(spotId))
    closeProp()
  }

  return (
    <div>
      <h2 className = "title">Update a Spot</h2>
      <form onSubmit={handleSubmit} className="formContainer">
      <div className="errors">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) =>
                  <div>{error}</div>
                  )}
              </div>
        
        <input
        placeholder = "Address"
          required
          id="address"
          type="text"
          value={address}
          onChange={updateAddress} />
       

        <input
        placeholder = "City"
          required
          type="text"
          value={city}
          onChange={updateCity} />
        
        <input
        placeholder = "Country"
          required
          type="text"
          value={country}
          onChange={updateCountry} />
        
        <input
        placeholder = "Description"
          required
          type="text"
          value={description}
          onChange={updateDescription} />
        
        <input
        placeholder = "Latitude"
          required
          type="number"
          value={lat}
          onChange={updateLat} />
       
        <input
        placeholder = "Longitude"
          required
          type="number"
          value={lng}
          onChange={updateLng} />
       
        <input
        placeholder = "Name"
          required
          type="text"
          value={name}
          onChange={updateName} />
        
        <input
        placeholder = "Price"
          required
          type="number"
          value={price}
          onChange={updatePrice} />
       
        <input
        placeholder = "State"
          required
          type="text"
          value={state}
          onChange={updateState} />


        <button className = 'submitButton' type="submit" disabled = {validationErrors.length > 0}>Update Spot</button>
      </form>
    </div>

  )

}

export default UpdateSpotForm