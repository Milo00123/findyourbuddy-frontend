import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useEffect } from 'react';


function Header() {
  const location = useLocation()
  const navigate = useNavigate();
  const [isVisible, setIsVisible]= useState(false)
  const userId = localStorage.getItem('userId');

        const showNavBar = () =>{
          setIsVisible(!isVisible)

        }

        const handleLogout = () => {
          localStorage.removeItem('userId');
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
            to={`/pool/${userId}`}
            className={({ isActive }) => `main-nav-container__link btn ${isActive ? 'active' : ''}`}
            >
            Pool
          </NavLink>
          <NavLink
            to={`/profile/${userId}`}
            className='main-nav-container__link btn'
            >
            Profile
          </NavLink>
            <NavLink
              to={`/profile/${userId}/Profile-Settings`}
              className={({ isVisible }) => `main-nav-container__link btn ${isVisible ? 'active' : ''}`}
              >
              Profile Settings
            </NavLink>
             <button onClick={handleLogout} className="main-nav-container__link btn">
               Log Out
              </button>
            </ul>
            
        
      </nav>
      </header>

    </>)
}

export default Header