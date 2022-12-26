import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updatebooking, getbookings } from '../../store/bookings';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots, getOneSpot } from '../../store/spots';
import './UpdateBooking.css';

const UpdateBookingForm = ({closeProp, currBooking}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotId = currBooking.Spots?.id
    const spot = currBooking.Spots
    let [startDate, setStartDate] = useState(currBooking.startDate);
    let [endDate, setEndDate] = useState(currBooking.endDate);
    const [validationErrors, setValidationErrors] = useState([]);

    const updateStartDate = (e) => setStartDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)
    
    useEffect(() => {
        const errors = []
        setValidationErrors(errors)
    }, [startDate, endDate])

    const handleSubmit =async (e) => {
        e.preventDefault();
       

        const bookingPayload = {
            startDate,
            endDate
        }

        try {
            const updatedBooking = await dispatch(updatebooking(bookingPayload, currBooking.id)).then(() => dispatch(getbookings(spotId))).then(() => dispatch(getOneSpot(spotId)))
            history.push(`/spots/${spotId}`)
        }

        catch (res) {
            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);
        }
    }

    return (
        <div className = "bookings-container">
            <h2 className = 'title'>Update Your Booking</h2>
            <div className = "topBookingsForModal">
            <div className = "bookForModal"><strong>${spot?.price}</strong> night</div>
            {/* <div className = "reviewStats"><strong><i class="fa-sharp fa-solid fa-star fa-xs"></i> {spot.avgStarRating}</strong> · {spot.numReviews} reviews</div> */}
            </div>
            <form onSubmit={handleSubmit} className = "bookings-form-container-forModal">
            <div className="errors">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) =>
                    <div>{error}</div>
                  )}
              </div>
                <div className = "dateInputsContainer">
                
                <input
                className = "dateinputleft"
                required
                id="start-date"
                type = "date"
                value = {startDate}
                onChange = {updateStartDate} />

                <input
                className = "dateinputright"
                required
                id="end-date"
                type = "date"
                value = {endDate}
                onChange = {updateEndDate} />
                </div>

                <button className = "submitButton" type="submit" disabled = {validationErrors.length > 0}>Reserve</button>
                <div className = "charge">You won't be charged yet</div>

                <div className = "bookingpricecontainer">
                    <div className = "underlinethis">${spot?.price} x {(Math.abs(new Date(endDate) - new Date(startDate)))/86400000} nights</div>
                    <div>${spot?.price * (Math.abs(new Date(endDate) - new Date(startDate)))/86400000} </div>   
                </div>

                <div className = "bookingpricecontainer">
                    <div className = "underlinethis">Cleaning fee</div>
                    <div>$80</div>   
                </div>

                <div className = "bookingpricecontainer">
                    <div className = "underlinethis">Service fee</div>
                    <div>$50 </div>   
                </div>

                    <div className = "border"></div>

                <div className = "TotalContainer">
                    <div className = "taxestotal">Total before taxes</div>
                    <div className = "taxestotal">${80 + 50 + spot?.price * (Math.abs(new Date(endDate) - new Date(startDate)))/86400000} </div>   
                </div>

            </form>
        </div>
    )
}

export default UpdateBookingForm