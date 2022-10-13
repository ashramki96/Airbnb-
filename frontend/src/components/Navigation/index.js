import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import CreateSpotForm from '../CreateSpotForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navigation.css'
import { useState, useEffect } from "react";


function Navigation({ isLoaded }){

  //added
  // const [showMenu, setShowMenu] = useState(false);
  
  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  
  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);
  
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  //added up
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <CreateSpotForm />
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className = 'loginSignupContainer'>
      
      <div className = "loginSignup">
        <div><LoginFormModal /></div>
        <div><SignupFormModal /></div>
        
      </div>
      </div>
    );
  }
  return (
    <nav className="navbar">
      
        <NavLink exact to="/"><img className = "logo" src = "https://i.postimg.cc/MGPjgnj4/high-res-ashbnb.png" /></NavLink>
        {isLoaded && sessionLinks}
        
    </nav>
  );
}

export default Navigation;