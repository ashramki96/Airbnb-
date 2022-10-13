import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { NavLink } from 'react-router-dom';
import { Link, Route, useParams } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
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
    history.push('/')
  };

   let dropDownLinks

   if(user) {

    dropDownLinks = (
    <>
    <img className = "menuBar" onClick={openMenu}src = "https://static.thenounproject.com/png/659803-200.png"></img>
      
    {showMenu && (
      <div className="profile-dropdown">
        <div className = 'dropdownItems'>{user.firstName} {user.lastName}</div>
        <div className = 'dropdownItems'><Link to = {`/current/spots`}>My Spots</Link></div>
        <div>
          <div className = 'dropdownItems' onClick={logout}>Log Out</div>
        </div>
      </div>
    )}
    </>
    )
   }
  //else NEED TO DO


  return (
    <>
      
      {dropDownLinks}

    </>
  );
}

export default ProfileButton;