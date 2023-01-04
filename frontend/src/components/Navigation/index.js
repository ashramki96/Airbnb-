import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Route, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import CreateSpotForm from '../CreateSpotForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navigation.css'
import { useState, useEffect } from "react";
import SearchBar from '../SearchBar';


// function Navigation({ isLoaded }){

//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <>
//       <CreateSpotForm />
//       <ProfileButton user={sessionUser} />
//       </>
//     );
//   } else {
//     sessionLinks = (
//       <div className = 'loginSignupContainer'>
      
//       <div className = "loginSignup">
//         <div><LoginFormModal /></div>
//         <div><SignupFormModal /></div>
        
//       </div>
//       </div>
//     );
//   }
//   return (
//     <nav className="navbar">
      
//         <NavLink exact to="/"><img className = "logo" src = "https://i.postimg.cc/MGPjgnj4/high-res-ashbnb.png" /></NavLink>
//         {isLoaded && sessionLinks}
        
//     </nav>
//   );
// }

// export default Navigation;

function Navigation({ isLoaded }){
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
    sessionLinks = (
      <>
      {/* <CreateSpotForm /> */}
      {location.pathname === '/' ? <SearchBar />: null}
      <ProfileButton user={sessionUser} />
      
      </>
    );

  return (
    <nav className="navbar">
      
        <NavLink exact to="/"><img className = "logo" src = "https://i.postimg.cc/MGPjgnj4/high-res-ashbnb.png" /></NavLink>
        {isLoaded && sessionLinks}
        
    </nav>
  );
}

export default Navigation;