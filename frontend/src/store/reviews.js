import { csrfFetch } from "./csrf"

const READ = 'reviews/READ'
const CREATE = 'reviews/CREATE'

const read = reviews => ({
    type: READ,
    reviews
})

const create = review => ({
    type: CREATE,
    review
})

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
        default:
            return state
    }
}

export default reviewsReducer