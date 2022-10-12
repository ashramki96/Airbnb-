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


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      <CreateSpotForm />
      <Link to = {`/current/spots`}><button>My Spots</button></Link>
      </>
    );
  } else {
    sessionLinks = (
      <div>
       {/* <button className='hamburger'>
            Hamburger
        </button> */}
      <ul className = "sessionLinks">
        <li><LoginFormModal /></li>
        <li><SignupFormModal /></li>
        
      </ul>
      </div>
    );
  }
  return (
    <nav className="navbar">
      
        <NavLink exact to="/"><img className = "logo" src = "https://i.postimg.cc/MGPjgnj4/high-res-ashbnb.png" /></NavLink>
        {isLoaded && sessionLinks}
        
    </nav>
  );

  // return (
  //   <div className="navbar">
  //     <div>
  //       <NavLink exact to="/"><img className = "logo" src = "https://iili.io/LASpOG.png" /></NavLink>
        
  //         {isLoaded && sessionLinks}
        
  //     </div>
  //   </div>
  // );
}

export default Navigation;