// const READ = 'reviews/READ'

// const read = reviews => ({
//     type: READ,
//     reviews
// })

// export const getReviews = (spotid) => async (dispatch) => {
//     const response = await fetch('/api/spots');
//     if(response.ok) {
//         const spots = await response.json();
//         dispatch(read(spots))
//         return response
//     }
// }

// const initalState = {
    
// }

// const spotsReducer = (state = initalState, action) => {
//     switch(action.type) {
//         case READ:
//             const allSpots = {};
//             action.spots.Spots.forEach(spot => {
//                 allSpots[spot.id] = spot
//             });
//             return {
//                 ...state,
//                 ...allSpots,
//             }
//         default:
//             return state
//     }
// }

// export default spotsReducer