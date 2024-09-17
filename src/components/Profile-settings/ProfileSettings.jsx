import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ProfileSettings.scss'


const buddyProfileUrl = 'http://localhost:8080/profile';
function ProfileSettings() {
   const navigate = useNavigate();
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const userId = parseInt(localStorage.getItem('userId'), 10);
   const [imagePreview, setImagePreview] = useState(null);
   const [formData, setFormData] = useState({
    name: '',
    about: '',
    profile_image: '',
    riding_level: '',


   })
   useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${buddyProfileUrl}/${userId}`);
          const updatedData = {
            ...response.data,
            about: response.data.about === "null" || response.data.about === null ? '' : response.data.about,
            profile_image: response.data.profile_image === "null" || response.data.profile_image === null ? '' : response.data.profile_image,
            riding_level: response.data.riding_level === "null" || response.data.riding_level === null ? '' : response.data.riding_level,
          };
          setFormData(updatedData);
        } catch (error) {
          console.error('Error Getting user data', error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

     const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setFormData({
              ...formData,
              profile_image: file
          });

          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToUpdate = new FormData();
    dataToUpdate.append('name', formData.name); 
    dataToUpdate.append('about', formData.about);
    dataToUpdate.append('riding_level', formData.riding_level);

    if (formData.profile_image) {
        dataToUpdate.append('profile_image', formData.profile_image);
    }

    try {
        const response = await axios.put(`${buddyProfileUrl}/${userId}`, dataToUpdate, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,

        });
        console.log('Profile updated successfully:', response.data);
        navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Error submitting form', error.response || error.message);
    }
};


      const handleDelete = async () => {
        try {
          await axios.delete(`${buddyProfileUrl}/${userId}`);
          navigate('/');
        } catch (error) {
          console.error('Error deleting profile:', error);
        }
      };



  return (<>
  < div className='update-profile-wrap'>
  <h1 className="profile-settings-title">Profile Settings</h1>
    <div className='update-profile-box'>   
      
            <form onSubmit={handleSubmit} className='form-update-profile'>
           

              <div className='update-img-container'>
            <label className='update-label update-label__img'>
                    Profile Image
                {imagePreview && (
                <img src={imagePreview} alt="Profile Preview" className='profile-image-preview' />
                        )}
                <input
                    className='update-profile-input update-profile-input__img'
                    type='file'
                    name='profile_image'
                    onChange={handleImageChange}
                  />
                        
                         
            </label>
            </div>
      <div className='update-profile-box-two'>
          <label className='update-label'>
              About
          <textarea
           className='update-profile-textarea'
           type='text'
           name='about'
           placeholder='Tell people about you '
           value={formData.about === "null" || formData.about === null ? '' : formData.about}
           onChange={handleChange}
          ></textarea>
           </label>
  
          <label className='update-label'>
              Update Riding Level
            <select
           className='update-profile-input'
           type='text'
           name='riding_level'
           placeholder='Riding Level'    
           onChange={handleChange}
           value={formData.riding_level === "null" || formData.riding_level === null ? '' : formData.riding_level}
          > <option>Choose</option>
           <option value='Beaginer'>Beaginer 🟢</option>
           <option value='Intermediate'>intermediate 🔵</option>
           <option value='Strong Intermediate'>Strong Intermediate 🔵 ⚫</option>
           <option value='Advance'>Advance ⚫⚫ </option>
           <option value='Expert'>Expert 🔴</option>


           
           </select>   
          </label>
          
          <div className='submit-update-box'>
              <button onClick={()=>navigate(`/profile/${userId}`)} className='update-profile-tbn' type="submit">Cancel</button>
              <button className='update-profile-tbn' type="submit">Update Profile</button>
          </div>
          </div>
      </form>
  
      </div>
      <div className='update-btn-container'>
              <button className='btn-update-password'
                    onClick={()=>{navigate(`update-password`)}}>Update Password</button>
            </div>
        <div className='delete-btn-container'>
              {showDeleteConfirm ? (
            <div className='delete-confirm-container'>
                  <p className='delete-msg'>Are you sure you want to delete your profile?🤨</p>
                  <div className='delete-confirm-box'>
                      <button
                      className='delete-profile-btn__delete'
                      onClick={handleDelete}>
                         🫠 Yes, I am
                          </button>
                      <button
                      className='delete-profile-btn__cancel'
                      onClick={() => setShowDeleteConfirm(false)}    
                      >😎 Cancel</button>
                  </div>
           </div>
              ) : (
                  <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className='delete-profile-btn'
                  >Delete Profile </button>
              )}
            
       
            

     </div>
 </div>
    </>)
}

export default ProfileSettings