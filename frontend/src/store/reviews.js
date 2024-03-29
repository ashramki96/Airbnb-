import { csrfFetch } from "./csrf"
import { getSpots } from "./spots"

const READ = 'reviews/READ'
const CREATE = 'reviews/CREATE'
const DELETE = 'reviews/DELETE'
const UPDATE = 'reviews/UPDATE'

const read = reviews => ({
    type: READ,
    reviews
})

const create = review => ({
    type: CREATE,
    review
})

const update = review => ({
    type: UPDATE,
    review
})

const deleteAction = review => ({
    type: DELETE,
    review
})

export const deleteReview = (reviewId) => async dispatch => {
    
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

        dispatch(deleteAction(reviewId))

}

export const getReviews = (spotid) => async (dispatch) => {
    
    const response = await fetch(`/api/spots/${spotid}/reviews`);
    if(response.ok) {
        const reviews = await response.json();
        dispatch(read(reviews))
    }
}

export const createReview = (reviewPayload, spotId) => async dispatch => {
    
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewPayload)
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(create(review))
        return review
    }
}

export const updateReview = (reviewPayload, spotId, reviewid) => async dispatch => {
    
    const response = await csrfFetch(`/api/reviews/${reviewid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewPayload)
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(update(review))
        return review
    }
}

const initalState = {
    
}

const reviewsReducer = (state = initalState, action) => {
    switch(action.type) {
        case READ:
            const allReviews = {};
           action.reviews.Reviews.forEach(review => {
            allReviews[review.id] = review
           });
           return {
            ...state,
            ...allReviews
           }
        case DELETE:
            const newState = {...state}
            delete newState[action.review]
            return newState
        default:
            return state
    }
}

export default reviewsReducer