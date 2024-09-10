import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Profile.scss';


const buddyUrl = 'http://localhost:8080';
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

    < div key={profile.id} className='profile-box'>
       <div className='profile-inner-box'>
       <img alt='profile_img'
            className='profile-image' 
            src={`${buddyUrl}${profile.profile_image}`}
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
  
  
      
      
      </> )
}

export default Profile