import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './index.css'
import { getSpots } from '../../store/spots';


const CreateSpotForm = ({closeProp}) => {

  console.log("This is being rendered")

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [description, setDescription] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [state, setState] = useState("")
    const [url, setUrl] = useState("")
    const [preview, setPreview] = useState(false)
    

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
    const updateUrl = (e) => setUrl(e.target.value)
    const updatePreview = (e) => setPreview(!preview)

    useEffect(() => {

      const errors = []
      if(lat > 90 || lat < -90) errors.push("Please provide a valid latitude")
      if(lng > 180 || lng < -180) errors.push("Please provide a valid longitude")
      if(price < 0 ) errors.push("Minimum charge can't be less than $0")
      if(description.length > 254) errors.push("Description can't be longer than 255 characters")

      setValidationErrors(errors)
    }, [lat, lng, price, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
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

        const imagePayload = {
          url,
          preview: true
        }


        const createdSpot = await dispatch(createSpot(imagePayload, payload))
        closeProp()
        console.log("Payload id is", createdSpot.id)

         history.push(`/spots/${createdSpot.id}`)
      }

        return (
          <><h2 className = "title">Create a spot</h2>
          <div>
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
              type="text"
              value={lat}
              onChange={updateLat} />

              
              <input
              placeholder = "Longitude"
              type="text"
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

             
              <input
              placeholder = "Image url"
              required
              type="string"
              value={url}
              onChange={updateUrl} />

            {/* <label for = "preview">Check to make this image your preview</label>
            <input type="checkbox" value = {preview} onChange = {updatePreview}/> */}
              
            
            <button className = "submitButton" type="submit">Create New Spot</button>
          </form>
          </div>
          </>
        )
    
}

export default CreateSpotForm