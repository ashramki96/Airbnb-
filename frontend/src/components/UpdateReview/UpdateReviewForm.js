import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateReview, getReviews } from '../../store/reviews';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots, getOneSpot } from '../../store/spots';
// import './CreateReview.css';



const UpdateReviewForm = ({closeProp, currReview}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()

    

    const spotsArr = useSelector(state => Object.values(state.spots))
    const currentSpot = spotsArr.find(singleSpot => singleSpot.id === +spotId)

    console.log("currReview is ", currReview)
    
    

    const [review, setReview] = useState(currReview.review)
    const [stars, setStars] = useState(currReview.stars)
    const [validationErrors, setValidationErrors] = useState([])

    const updateReviewForm = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    // useEffect(() => {
    //     dispatch(getReviews(spotId))
    // }, [dispatch, spotId])

    useEffect(() => {

        const errors = []
        if(stars > 5 || stars < 1) errors.push("Rating must be between 1 and 5")
        if(review.length > 254) errors.push("Review can't be longer than 255 characters")
        
  
        setValidationErrors(errors)
      }, [stars, review])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            review,
            stars
        }

        const createdReview = await dispatch(updateReview(reviewPayload, spotId, currReview.id)).then (() => dispatch(getReviews(spotId))).then (() => dispatch(getOneSpot(spotId)))
        dispatch(getReviews(spotId))
        closeProp()
        // .then(() => dispatch(getSpots()))
        console.log("CREATED REVIEW IS ", createdReview)
    }

    return (
        <div>
            <h2 className = 'title'>Update Your Review</h2>
            <form onSubmit={handleSubmit} className="formContainer">
            <div className="errors">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) =>
                    <div>{error}</div>
                  )}
              </div>
                
                <input
                    placeholder = 'Review'
                    required
                    id="review"
                    type="text"
                    value={review}
                    onChange={updateReviewForm} />

                
                <input
                    placeholder = 'Rating on a scale of 1 - 5'
                    required
                    id="stars"
                    type="number"
                    value={stars}
                    onChange={updateStars} />

               <button className = "submitButton" type="submit" disabled = {validationErrors.length > 0}>Update review</button>

            </form>
        </div>
    )
}

export default UpdateReviewForm