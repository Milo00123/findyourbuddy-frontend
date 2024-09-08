import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './SignUp.scss';

const URL = 'http://localhost:8080/sign-up';
function SignUp() {
const navigate = useNavigate();
const [userName, setUsername] = useState('');
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('');
const [password, setPassword]= useState('');
const [confirmPassword, setConfirmPassword]= useState('');
const [error, setError] = useState({});
const [success, setSuccess] = useState(null);


  const mustUpperCase = /[A-Z]/;
  const mustNumber = /\d/;
  const mustSymbol = /[!@#$%^&*(),.?":{}|<>]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formValidation = () => {
  const errors = {}; 

  if (!userName && !lastName && !email && !password && !confirmPassword) {
    errors.allFields = '🫠 All fields are required 🫠';
    return errors; 
  }
  if (!userName) errors.userName = ' Name is needed 🤪';
  if (!lastName) errors.lastName = ' Last name is needed 🫣';
  if (!email){errors.email = ' Email is needed   😜'; 
  } else if (!emailRegex.test(email)) {
    errors.email = 'Enter a valid email address 🫢';
  }
  if (!password) {
    errors.password = ' Password is needed 😝';
  } else {

    if (!mustUpperCase.test(password)) errors.password = 'Password must contain an uppercase letter';
    if (!mustNumber.test(password)) errors.password = 'Password must contain a number';
    if (!mustSymbol.test(password)) errors.password = 'Password must contain a special symbol';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your password 😛';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

 const hanbleSubmit = async(e)=>{
  e.preventDefault();
  const validationErrors = formValidation();
  if (Object.keys(validationErrors).length > 0) {
    setError(validationErrors);
    return;
  }
  try {
    const response = await axios.post(URL, {
      userName,
      lastName,
      email,
      password
    });
    if(response.useState === 201){
      setSuccess('😄 Account created!! 😄')
      localStorage.setItem('token', response.data.token)
      setTimeout(() => navigate('/'), 3000); 
    }  else {
      setError({ form: 'Server error. Please try again later.' });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setError({ form: error.response.data.message });
    } else {
      setError({ form: 'Server error. Please try again later.' });
    }
  }
};




  return (<>
    <div className='sign-up-container'>
  
      <h1 className='sign-up-title'>Sign Up</h1>
      {success && <div className="success-message">{success}</div>}
      {error.allFields && <div className="error">{error.allFields}</div>}
      <form  className='sign-up-form'
      onSubmit={hanbleSubmit}> 
        
          <input 
            type='text'
            className='input-sign-up'
            placeholder='Name'
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            ></input>
             {error.userName && <div className="error">{error.userName}</div>}<br></br>
  
          <input
            className='input-sign-up'
            placeholder='Last name'
            value={lastName}
            onChange={(e)=> setLastName(e.target.value)}
          
            ></input>
             {error.lastName && <div className="error">{error.lastName}</div>}
            <br></br>
  
          <input 
           className='input-sign-up'
           placeholder='Email'
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
           
           ></input>
            {error.email && <div className="error">{error.email}</div>}<br></br>
          
          <input 
           className='input-sign-up'
            placeholder='Enter a password'
            type='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          
            ></input>
             {error.password && <div className="error">{error.password}</div>}<br></br>
  
          <input 
          className='input-sign-up' 
          placeholder='Confirm your Password'
          type='password'
          value={confirmPassword}
          onChange={(e)=> setConfirmPassword(e.target.value)}

          ></input>
           {error.confirmPassword && <div className="error">{error.confirmPassword}</div>}<br></br>
         
          <button type='submit' className='sign-in-button'>Sign Up</button>
      </form>
      <button className='back-btn' onClick={() => navigate('/')}>Login</button>
  
      </div>
      </>)
}

export default SignUp