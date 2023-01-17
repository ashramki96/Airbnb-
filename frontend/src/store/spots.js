import { csrfFetch } from "./csrf"

const READ = 'spots/READ'
const READ_ONE = 'spots/READ_ONE'
const CREATE = 'spots/CREATE'
const DELETE = 'spots/DELETE'

const read = spots => ({
    type: READ,
    spots
})

const readOne = spot => ({
    type: READ_ONE,
    spot
})

const create = spot => ({
    type: CREATE,
    spot
})

const deleteAction = spotId => ({
    type: DELETE,
    spotId
})

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok) {
        dispatch(deleteAction(spotId))
        return response
    }
}

// export const createSpotImage = data => async dispatch =>{
//     console.log("The image URL is", data.image)
//     console.log("The spot id is", data.id)
//     const response = await csrfFetch(`/api/spots/${data.id}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
// }

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    
    if(response.ok) {
        const spot = await response.json();
        
        dispatch(readOne(spot))
        return response

    }
    
}


export const createSpot = (imagePayload, payload) => async dispatch => {

    
    
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        let imgResponse
        let spot

        
        if(response.ok) {
        spot = await response.json();
        
        

         imgResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imagePayload)
            })

        }

        
        
        if(response.ok && imgResponse.ok){
            dispatch(create(spot))
            return spot
        }

}

export const updateSpot = data => async dispatch => {
   
    const response = await csrfFetch(`/api/spots/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    if(response.ok) {
        const spot = await response.json();
        dispatch(create(spot))
        return spot
    }
}


export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    
    if(response.ok) {
        const spots = await response.json();
        dispatch(read(spots))
        
    }
}



const initalState = {
    
}

const spotsReducer = (state = initalState, action) => {
    
    switch(action.type) {
        case READ:
            const allSpots = {}
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            return {
                ...state,
                ...allSpots,
            }

        case READ_ONE:
            const updatedState = {...state}
            updatedState[action.spot.id] = action.spot
            return updatedState
        
        case CREATE: 
            
                const newState = {
                    ...state,
                }
                newState[action.spot.id] = action.spot
                return newState

        case DELETE: 
                const deletedState = {
                    ...state
                }
                delete deletedState[action.spotId]
                
                return deletedState
        default:
            return state
    }
}

export default spotsReducer