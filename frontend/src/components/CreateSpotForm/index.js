import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './index.css'


const CreateSpotForm = () => {

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
          preview
        }


        const createdSpot = await dispatch(createSpot(imagePayload, payload))
        console.log("Payload id is", createdSpot.id)

         history.push(`/spots/${createdSpot.id}`)
      }

        return (
          <div>
            <h2>Create a Spot</h2>
            <form onSubmit={handleSubmit} className = "form">

            <label htmlFor = "address">Address</label>
            <input
              id = "address"
              type="text"
              value={address}
              onChange={updateAddress} />

              <label for = "city">City</label>
            <input
              type="text"
              value={city}
              onChange={updateCity} />

              <label for = "country">Country</label>
              <input
              type="text"
              value={country}
              onChange={updateCountry} />

              <label for = "description">Description</label>
              <input
              type="text"
              value={description}
              onChange={updateDescription} />

              <label for = "lat">Lat</label>
              <input
              type="text"
              value={lat}
              onChange={updateLat} />

              <label for = "lng">Lng</label>
              <input
              type="text"
              value={lng}
              onChange={updateLng} />

              <label for = "name">Name</label>
              <input
              type="text"
              value={name}
              onChange={updateName} />

              <label for = "price">Price</label>
              <input
              type="text"
              value={price}
              onChange={updatePrice} />

              <label for = "state">State</label>
              <input
              type="text"
              value={state}
              onChange={updateState} />

              <label for = "image">Image</label>
              <input
              type="text"
              value={url}
              onChange={updateUrl} />

            <label for = "preview">Check to make this image your preview</label>
            <input type="checkbox" value = {preview} onChange = {updatePreview}/>
              
            
            <button type="submit">Create New Spot</button>
          </form>
          </div>

        )
    
}

export default CreateSpotForm