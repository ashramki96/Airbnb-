import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { NavLink } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from '../../context/Modal';
import CreateSpotFormModal from "../CreateSpotForm";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const [showSignupFormModal, setShowSignupFormModal] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowLoginFormModal(false);
    setShowSignupFormModal(false);
    history.push('/')
  };

  const mySpots = (e) => {
    e.preventDefault();
    history.push('/current/spots')
  }

   let dropDownLinks

   if(user) {

    dropDownLinks = (
    <>
    <div className = "navLinksContainer">
    <CreateSpotFormModal />
    <div className = "welcomeName"> Welcome {user.firstName}!</div>
    <img className = "menuBar" onClick={openMenu}src = "https://static.thenounproject.com/png/659803-200.png"></img>
   
    </div>
    {showMenu && (
      

      <div className="profile-dropdown">
        
        {/* <div className = 'dropdownItems'><Link to = {`/current/spots`}>My Spots</Link></div> */}
        <div className = 'dropdownItems' onClick = {mySpots}>My Spots</div>
        <div>
          <div className = 'dropdownItems' onClick={logout}>Log Out</div>
        </div>
      </div>
    )}
    </>
    )
   }
  else {
    dropDownLinks = (
      <>
    <img className = "menuBar" onClick={openMenu}src = "https://static.thenounproject.com/png/659803-200.png"></img>
   
    
      {showMenu && (
        <div className="profile-dropdown">
        <div className = 'dropdownItems' onClick = {() => setShowLoginFormModal(true)}>Log in</div>
        <div className = 'dropdownItems' onClick = {() => setShowSignupFormModal(true)}>Sign up</div>
      </div>
      
      )}

      {showLoginFormModal && (
          <Modal onClose={() => setShowLoginFormModal(false)}>
            <LoginForm />
          </Modal>
        )}
      

      {showSignupFormModal && (
        <Modal onClose={() => setShowSignupFormModal(false)}>
        <SignupForm />
      </Modal>
      )}

      </>

    )
  }


  return (
    <>
      
      {dropDownLinks}

    </>
  );
}

export default ProfileButton;