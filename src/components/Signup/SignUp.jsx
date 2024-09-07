import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.scss';


function SignUp() {
const navigate = useNavigate();






  return (<>
    <div className='sign-up-container'>
      <h1 className='sign-up-title'>Sign Up</h1>

  
      <form  className='sign-up-form'>
        
          <input 
            type='text'
            className='input-sign-up'
            placeholder='Name'
  
        
            required
            ></input><br></br>
  
          <input
            className='input-sign-up'
            placeholder='Last name'


            required
            ></input><br></br>
  
          <input 
           className='input-sign-up'
           placeholder='Email'

           required
           ></input><br></br>
          
          <input 
           className='input-sign-up'
            placeholder='Enter a password'
            type='password'


            required
            ></input><br></br>
  
          <input 
          className='input-sign-up' 
          placeholder='Confirm your Password'
          type='password'


          ></input><br></br>
          <button type='submit' className='sign-in-button'>Sign Up</button>
      </form>
      <button className='back-btn' onClick={() => navigate('/')}>Login</button>
  
      </div>
      </>)
}

export default SignUp