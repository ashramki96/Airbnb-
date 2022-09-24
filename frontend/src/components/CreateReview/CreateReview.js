import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview, getReviews } from '../../store/reviews';
import { Link, Route, useParams } from 'react-router-dom';


const CreateReview = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()
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
        
  
        setValidationErrors(errors)
      }, [stars])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            review,
            stars
        }

        const createdReview = await dispatch(createReview(reviewPayload, spotId))
        dispatch(getReviews(spotId))
        console.log("CREATED REVIEW IS ", createdReview)
    }

    return (
        <div>
            <h2>Create a Review:</h2>
            <form onSubmit={handleSubmit} className="form">
            <ul className="errors">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) =>
                    <li key={error}>{error}</li>
                  )}
              </ul>
                <label htmlFor='review'>Review</label>
                <input
                    required
                    id="review"
                    type="text"
                    value={review}
                    onChange={updateReview} />

                <label htmlFor='stars'>Stars</label>
                <input
                    required
                    id="stars"
                    type="number"
                    value={stars}
                    onChange={updateStars} />

                <button type="submit">Create review</button>

            </form>
        </div>
    )
}

export default CreateReview