// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Route, useParams } from 'react-router-dom';
// import { getSpots } from '../../store/spots';


// const AllReviewsCurrentUser = () => {
//     const dispatch = useDispatch()

//     const userId = useSelector(state => state.session.user.id )
//     console.log("USER ID is", userId)

//     const reviews = useSelector(state => state.reviews)
//     const reviewsArr = Object.values(reviews)
//     const userReviews = reviewsArr.filter(review => review.userId === userId)
//     console.log("User's reviews are ", userReviews)


// }