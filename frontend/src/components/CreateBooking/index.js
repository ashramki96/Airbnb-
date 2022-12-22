import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createbooking, getbookings } from '../../store/bookings';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots, getOneSpot } from '../../store/spots';
import './CreateBooking.css';

const CreateBooking = ({sessionUser}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const updateStartDate = (e) => setStartDate(e.target.value)
    const updateEndDate = (e) => setEndDate(e.target.value)

    const handleSubmit =async (e) => {
        e.preventDefault();

        const bookingPayload = {
            startDate,
            endDate
        }

        const createdBooking = await dispatch(createbooking(bookingPayload, +spotId)).then (() => dispatch(getbookings(spotId))).then (() => dispatch(getOneSpot(spotId)))
        history.push("/")
    }

    return (
        <div className = "bookings-container">
            <div className = "book">Book this spot</div>
            <form onSubmit={handleSubmit} className = "bookings-form-container">
            <div className="errors">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) =>
                    <div>{error}</div>
                  )}
              </div>

                <input
                placeholder = 'Start date'
                required
                id="start-date"
                type = "date"
                value = {startDate}
                onChange = {updateStartDate} />

                <input
                placeholder = 'End date'
                required
                id="end-date"
                type = "date"
                value = {endDate}
                onChange = {updateEndDate} />

                <button className = "submitButton" type="submit" disabled = {validationErrors.length > 0}>Reserve</button>

            </form>
        </div>
    )
}

export default CreateBooking