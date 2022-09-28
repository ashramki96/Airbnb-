import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateSpot } from '../../store/spots';
import { Link, Route, useParams } from 'react-router-dom';


const UpdateSpotForm = ({closeProp}) => {
  const { spotId } = useParams()
  console.log("update is being rendered")
  const spotsArr = useSelector(state => Object.values(state.spots))
  const currentSpot = spotsArr.find(singleSpot => singleSpot.id === +spotId)
  console.log("THE CURRENT SPOT IS", currentSpot)


  const dispatch = useDispatch();

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [state, setState] = useState("")
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

    setValidationErrors(errors)
  }, [lat, lng, price])

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
    closeProp()
  }

  return (
    <div>
      <h2>Update a Spot</h2>
      <form onSubmit={handleSubmit} className="form">
      <ul className="errors">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) =>
                    <li key={error}>{error}</li>
                  )}
              </ul>
        <label htmlFor="address">Address</label>
        <input
          required
          id="address"
          type="text"
          value={address}
          onChange={updateAddress} />
        <label for="city">City</label>

        <input
          required
          type="text"
          value={city}
          onChange={updateCity} />
        <label for="country">Country</label>
        <input
          required
          type="text"
          value={country}
          onChange={updateCountry} />
        <label for="description">Description</label>
        <input
          required
          type="text"
          value={description}
          onChange={updateDescription} />
        <label for="lat">Lat</label>
        <input
          required
          type="text"
          value={lat}
          onChange={updateLat} />
        <label for="lng">Lng</label>
        <input
          required
          type="text"
          value={lng}
          onChange={updateLng} />
        <label for="name">Name</label>
        <input
          required
          type="text"
          value={name}
          onChange={updateName} />
        <label for="price">Price</label>
        <input
          required
          type="text"
          value={price}
          onChange={updatePrice} />
        <label for="state">State</label>
        <input
          required
          type="text"
          value={state}
          onChange={updateState} />


        <button type="submit">Update Spot</button>
      </form>
    </div>

  )

}

export default UpdateSpotForm