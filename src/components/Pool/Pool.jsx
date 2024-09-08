import React from 'react'
import './Pool.scss';






function Pool() {
  return (<>
    <div className='pool-container'>
    <div>
        <h1 className='pool-title'>Welcome to the Pool !</h1>
        
      </div>

        <form  className='pool-form'>
        {/* <img alt='profile_img' className='pool-avatar' src={`${URL}${poolData.profile_image}`} /> */}
               
                <div className='pool-form-input'>
                <input
                    type="text"
                   
                    className='pool-input'
                    placeholder='Pool title'>    
                 </input>
                <input 
            
       
                    className='pool-input pool-input__plan' 
                    placeholder='What is the plan?'>
                </input>
                <button className='pool-form-btn'>POST</button>
                </div>
            
        </form>
        <div>

        </div>
    </div>
    </>)
}

export default Pool