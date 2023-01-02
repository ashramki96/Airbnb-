import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotDetails from '../SpotDetails';
import { deleteSpot } from '../../store/spots';
import { deletebooking, getUserbookings } from '../../store/bookings';
import './AllBookings.css'
import UpdateBookingFormModal from '../UpdateBooking';

const AllBookingsCurrentUser = () => {


    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id )
    console.log("USER ID is", userId)
    const bookings = useSelector(state => Object.values(state.bookings))
    const userBookings = bookings.filter(booking => booking.userId === userId )
    const bookingsArr = userBookings
   

    useEffect(() => {{
        dispatch(getSpots());
        dispatch(getUserbookings())
    }}, [dispatch])

    if(!bookings) return null

    // if(!userSpots.length){
    //     return (
    //         <>
    //         <h3 className = "noSpots">You don't have any spots at the moment. Start your journey with us by clicking on 'Become a host'</h3>
    //         <img className = "balloonPic" src = "https://media.cntraveler.com/photos/605961ae7b588da524cfef44/master/w_2580%2Cc_limit/Cappadocia-GettyImages-166186583.jpg"></img>
    //         </>
    //     )
    // }

    const handleDelete = async (bookingId) => {
        const deleteBooking = await dispatch(deletebooking(bookingId)).then (() => dispatch(getUserbookings()))
    }

    if(!bookingsArr.length){
        return (
            <>
            <h3 className = "noSpots">You don't have any bookings at the moment</h3>
            <img className = "balloonPic" src = "https://media.cntraveler.com/photos/605961ae7b588da524cfef44/master/w_2580%2Cc_limit/Cappadocia-GettyImages-166186583.jpg"></img>
            </>
        )
    }
    return (
        <>
        <h1 className = "mySpots">My Bookings</h1>
        <div className = 'cardOuterContainer'>
        <div className='cardInnerContainer'>
            
        {bookingsArr.map(booking => {
               return (
                   <div className='spotCard'>
                       <Link key={booking.Spots?.name} to={`/spots/${booking.Spots?.id}`}>

                           <div><img className='spotImage' src={booking.Spots?.previewImage} width="200" height="150"></img></div></Link>
                       <div className='spotDeets'>
                           <div className='spotName'>{booking.Spots?.name}</div>
                           <div className='spotRating'><div className="star"></div>  <div className='spotPrice'>${booking.Spots?.price} night</div></div>
                       </div>
                      
                       <div className='spotAddress'>Check-in: {booking.startDate}</div>
                       <div className='Address'>Checkout: {booking.endDate}</div>
                       <div className="spotDeets">
                           <div className='spotPrice'>Total: ${80 + 50 + booking.Spots?.price * (Math.abs(new Date(booking.endDate) - new Date(booking.startDate))) / 86400000}</div>
                           <div className = 'bookingButtons'>
                            <UpdateBookingFormModal currBooking = {booking} />
                               <button className='deleteBookingButton' onClick={() => handleDelete(booking.id)}>Delete Booking</button>
    
                           </div>
                       </div>

            </div>
               )
            })}
            
            
            
        </div>
        </div>
        </>
        )
}


export default AllBookingsCurrentUser