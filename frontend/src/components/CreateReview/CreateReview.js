import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview, getReviews } from '../../store/reviews';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots, getOneSpot } from '../../store/spots';
import './CreateReview.css';



const CreateReview = ({closeProp}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()


    const spotsArr = useSelector(state => Object.values(state.spots))
    const spot = spotsArr.find(singleSpot => singleSpot.id === +spotId)

    
    
    

    const [review, setReview] = useState("")
    const [stars, setStars] = useState()
    const [validationErrors, setValidationErrors] = useState([])

    const updateReview = (e) => setReview(e.target.value)
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

        const createdReview = await dispatch(createReview(reviewPayload, spotId)).then (() => dispatch(getReviews(spotId))).then (() => dispatch(getOneSpot(spotId)))
        dispatch(getReviews(spotId))
        closeProp()
        // .then(() => dispatch(getSpots()))
        console.log("CREATED REVIEW IS ", createdReview)
    }

    return (
        <div>
            <h2 className = 'title'>Create a Review</h2>
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
                    onChange={updateReview} />

                
                <input
                    placeholder = 'Rating on a scale of 1 - 5'
                    required
                    id="stars"
                    type="number"
                    value={stars}
                    onChange={updateStars} />

               <button className = "submitButton" type="submit" disabled = {validationErrors.length > 0}>Create review</button>

            </form>
        </div>
    )
}

export default CreateReview