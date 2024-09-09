import React from 'react'
import './NotFound.scss';
import memeDog from '../../Assets/Images/memedog4.png';


function NotFound() {
  return (<>

  <div className='not-found-container'>
  <h1 className='not-found-title'>404</h1>
  <div className='not-found'>We couldn't find that page 😵</div>
  <img className='meme-dog' src={memeDog} alt='meme-dog'></img>


  </div>
    </> )
}

export default NotFound