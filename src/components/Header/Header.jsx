import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';


function Header() {
  const location = useLocation()
const navigate = useNavigate();
const [isVisible, setIsVisible]= useState(false)

 const showNavBar = () =>{
  setIsVisible(!isVisible)

 }


const handleProfileClick = (e) => {
    e.preventDefault()
    // if(user){
    //     navigate(`/profile/${user.id}`)
    // }
};
const handlePoolClick = (e) => {
  e.preventDefault();
  // if (user) {
  //   navigate(`/pool/${user.id}`);
  // }
};
const handleProfileSettings = (e)=> {
  e.preventDefault();
  // if(user){
  //   navigate(`/profile/${user.id}/Profile-settings`)
  // }

}

const handleLogout = (e) => {
    e.preventDefault()

    navigate('/');
  };
  
  
  const hiddenPaths = ['/', '/sign-up'];
      if (hiddenPaths.includes(location.pathname)) {
          return null;
      }


  return (<>
    <header>
      
    <nav className='main-nav '>
      <div className='header-logo-container'>
         <div 
          className='header-logo'>
            Find Your Buddy</div>
    </div>
    <div className='nav-wrap'>
    <button onClick={showNavBar} className='box-btn'>
            {isVisible ? <FaTimes/> : <FaBars/>}
            </button>
            </div>
        <ul className={`main-nav-container ${isVisible ? 'visible' : ''}`}>
          <NavLink
            onClick={handlePoolClick}
            className={({ isActive }) => `main-nav-container__link btn ${isActive ? 'active' : ''}`}
            >
            Pool
          </NavLink>
          <NavLink
            onClick={handleProfileClick}
            className='main-nav-container__link btn'
            >
            Profile
          </NavLink>
            <NavLink
              onClick={handleProfileSettings}
              className={({ isVisible }) => `main-nav-container__link btn ${isVisible ? 'active' : ''}`}
              >
              Profile Settings
            </NavLink>
              <NavLink
                onClick={handleLogout}
                className={({ isVisible }) => `main-nav-container__link btn ${isVisible ? ' active' : ''}`}
                >
                Log Out
              </NavLink>
            </ul>
            
        
      </nav>
      </header>

    </>)
}

export default Header