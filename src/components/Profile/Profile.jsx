import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Profile.scss';
import defaultImage from '../../Assets/Logo/Find your Buddy (6).png';


const buddyUrl = 'https://findyourbuddy-server-f2e3d00ed8ad.herokuapp.com';
function Profile() {
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const [profile, setProfile]=useState(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async ()=>{
    try{
      const response = await axios.get(`${buddyUrl}/profile/${userId}`)
      setProfile(response.data)
    } catch(error){
      console.error('error fetching profile', error)
    }finally {
      setLoading(false);
    }
           }; 


useEffect(() => {
    if (userId) {
        fetchProfile(userId);
    }
    
}, [userId]);

if (loading) {
    return <div>Loading...</div>;
}

if (!profile) {
    return <div>No profile data</div>;
}

  return (<>
<div className='profile-wrap'>
    < div key={profile.id} className='profile-box'>
       <div className='profile-inner-box'>
       <img 
              alt='profile_img'
              className='profile-image' 
              src={profile.profile_image ? `${buddyUrl}${profile.profile_image}` : defaultImage} 
            />
            
              <div  className='profile-name'>Hi {profile.name},  Welcome back !</div>
              
       </div>
          
  
          <div className='profile-description-box'>
                      
                 <div className='profile-mini-container'>
                   <div className='profile-bold'>About </div>
                   <p className='profile-description'>{profile.about}</p>
                 </div>
  
                 <div className='profile-mini-container'>
                   <div className='profile-bold'> Riding Level</div>
                    <p className='profile-description'>{profile.riding_level}</p>  
                 </div>
  
                 <div className='profile-mini-container'>          
                     <div className='profile-bold'>Contact</div>
                     <p className='profile-description'>{profile.email}</p>
                  </div>                     
                        
          </div>
      
         
   </div>
  
  
   </div>   
      
      </> )
}

export default Profile