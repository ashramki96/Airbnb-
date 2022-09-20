

const READ = 'spots/READ'
const READ_ONE = 'spots/READ_ONE'

const read = spots => ({
    type: READ,
    spots
})

const readOneSpot = spot => ({
    type: READ_ONE,
    spot
})

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    console.log("RESPONSE", response)
    if(response.ok) {
        const spots = await response.json();
        dispatch(read(spots))
        
    }
}

// export const getOneSpot = (spotId) => async (dispatch) => {
//     const response = await fetch(`/api/spots/${spotId}`)
//     if(response.ok){
//         const spot = await response.json()
//         dispatch(readOneSpot(spot))
//          return spot
//     }
//     return null
// }

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

            
        
            
            

        default:
            return state
    }
}

export default spotsReducer