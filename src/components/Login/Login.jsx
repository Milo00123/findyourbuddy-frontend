import React from 'react'
import './Login.scss';
import { useNavigate } from 'react-router-dom'
import logo from '../../Assets/Logo/Find your Buddy (6).png'


function Login() {
    const navigate = useNavigate()








  return (<> <div className='login-container'>
    <img alt='img' src={logo} className='logo-login'></img>
      <h1 className='login-title'>Login</h1>
      <form  className='login-form'>
       
          <input
            className='input-login'
            placeholder='Enter Email'
           
      
            ></input>
       <div className='show-password-container'>
          <input 
           className='input-login'
            placeholder='Enter Password'
      
        
            ></input>
            
            <input
              className='show-password'
              type='checkbox'
              id='show-password'
    
            />
            <label className='eye-show-password' htmlFor='show-password'>
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