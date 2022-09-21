import { csrfFetch } from "./csrf"

const READ = 'spots/READ'
const CREATE = 'spots/CREATE'
const DELETE = 'spots/DELETE'

const read = spots => ({
    type: READ,
    spots
})

const create = spot => ({
    type: CREATE,
    spot
})

const deleteAction = spot => ({
    type: DELETE,
    spot
})

export const deleteSpot = (data) => async dispatch => {
    console.log("DATA TO BE DELETED IS" , data)
    const response = await csrfFetch(`/api/spots/${data.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok) {
        const spot = await response.json();
        dispatch(deleteAction(spot))
        return spot
    }
}

export const createSpot = data => async dispatch => {

    console.log("Create is being hit")
    console.log("DATA is", data)
    
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        console.log("RESPONSE IS", response)

        if(response.ok) {
            const spot = await response.json();
            dispatch(create(spot))
            return spot
        }
        
    
   

}

export const updateSpot = data => async dispatch => {
    console.log("DATA is" , data)
    console.log("DATA ID is", data.id)
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
    console.log("RESPONSE", response)
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
        // case READ_ONE:
        //     // const newState = {...state, 
        //     //     [action.spot.id]: action.spot
        //     // }
        //     // return {
        //     //     ...newState
        //     // }
        
        //     const newState = [action.spot]
        case CREATE: 
            
                const newState = {
                    ...state,
                }
                newState[action.spot.id] = action.spot
                return newState
        default:
            return state
    }
}

export default spotsReducer