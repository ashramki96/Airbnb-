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
    const [stars, setStars] = useState(0)

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    // useEffect(() => {
    //     dispatch(getReviews(spotId))
    // }, [dispatch, spotId])

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
                <label htmlFor='review'>Review</label>
                <input
                    id="review"
                    type="text"
                    value={review}
                    onChange={updateReview} />

                <label htmlFor='stars'>Stars</label>
                <input
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