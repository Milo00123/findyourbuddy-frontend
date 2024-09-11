import React from 'react'
import './Login.scss';
import { useNavigate } from 'react-router-dom'
import logo from '../../Assets/Logo/Find your Buddy (6).png'
import { useState } from 'react';
import axios from 'axios';
import { PiEyeLight, PiEyeSlash  } from "react-icons/pi";
import { TbWashDryP } from 'react-icons/tb';


const findyourbuddy = 'http://localhost:8080/';
function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');


    const emailFilter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const Validation = () => {
      const errors = {}; 
      if ( !email && !password ) {
        errors.allFields = '🫠 All fields are required 🫠';
        return errors;
       }
      if (!email){errors.email = ' Email is needed   😜'; 
      } else if (!emailFilter.test(email)) {
        errors.email = 'Enter a valid email address 🫢';
      }
      if (!password) {
        errors.password = ' Password is needed 😝';
      }  
      return errors;
    };


    const handleLogin = async (e) => {
      e.preventDefault();
      const validError = Validation();
      if (Object.keys(validError).length > 0) {
        setError(validError);
        return;
      }
      try {
        const response = await axios.post(`${findyourbuddy}profile/login`, {
          email: email,
          password: password
        },{ withCredentials: true });
        const { userId, success } = response.data;
  
        if (success) {
          localStorage.setItem('userId', userId);
          navigate(`/pool/${userId}`); 
        } else {
          setError(response.data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred. Please try again.');
      }
    };

  return (<> <div className='login-container'>
    <img alt='img' src={logo} className='logo-login'></img>
      <h1 className='login-title'>Login</h1>
      {error && 
            <p className='login-error'>
              {typeof error === 'object' ? error.allFields || error.email || error.password : error}
           </p>} 
      <form  className='login-form' onSubmit={handleLogin}>
       
               <input
            className='input-login'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></input>

       <div className='show-password-container'>
          <input 
           className='input-login'
            placeholder='Enter Password'
            type={showPassword ? 'text' : 'password'}
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            ></input>
            
            <input
              className='show-password'
              type='checkbox'
              id='show-password'
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label className='eye-show-password' htmlFor='show-password'>
            {showPassword ? <PiEyeSlash/> :<PiEyeLight/> }
            </label>
          </div>
          
          <button type='submit' className='login-button'>Login</button>
      </form>
      <h1 className='login-title'>or</h1>
      <button className='btn-create-account' onClick={() => navigate('/sign-up')}>Sign Up</button>
      </div>
    
      </> )
}

export default Login