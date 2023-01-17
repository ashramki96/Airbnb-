import { csrfFetch } from "./csrf"
import { getSpots } from "./spots"

const READ = 'bookings/READ'
const CREATE = 'bookings/CREATE'
const DELETE = 'bookings/DELETE'
const UPDATE = 'bookings/UPDATE'

const read = bookings => ({
    type: READ,
    bookings
})

const create = booking => ({
    type: CREATE,
    booking
})

const update = booking => ({
    type: UPDATE,
    booking
})

const deleteAction = booking => ({
    type: DELETE,
    booking
})

export const deletebooking = (bookingId) => async dispatch => {
    
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })

        dispatch(deleteAction(bookingId))

}

export const getbookings = (spotid) => async (dispatch) => {
    
    const response = await fetch(`/api/spots/${parseInt(spotid)}/bookings`);
    if(response.ok) {
        const bookings = await response.json();
        
        dispatch(read(bookings))
    }
}

export const getUserbookings = () => async (dispatch) => {
    
    const response = await fetch(`/api/bookings/current`);
    if(response.ok) {
        const bookings = await response.json();
        
        dispatch(read(bookings))
    }
}

export const createbooking = (bookingPayload, spotid) => async dispatch => {
    
    const response = await csrfFetch(`/api/spots/${parseInt(spotid)}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
    })

    if(response.ok) {
        const booking = await response.json()
        
        dispatch(create(booking))
        return booking
    }
}

export const updatebooking = (bookingPayload, bookingid) => async dispatch => {
    
    const response = await csrfFetch(`/api/bookings/${bookingid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
    })

    if(response.ok) {
        
        const booking = await response.json()
        
        dispatch(update(booking))
        return booking
    }
}

const initalState = {
    
}

const bookingsReducer = (state = initalState, action) => {
    switch(action.type) {
        case READ:
        const allbookings = {};
           action.bookings.Bookings.forEach(booking => {
            allbookings[booking.id] = booking
           });
           return {
            ...state,
            ...allbookings
           }
        case CREATE:
            const createdState = {...state}
            createdState[action.booking.id] = action.booking
            return createdState
        case DELETE:
            const newState = {...state}
            delete newState[action.booking]
            return newState
        default:
            return state
    }
}

export default bookingsReducer