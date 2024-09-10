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
    password: '',
    name: '',
    about: '',
    profile_image: '',
    riding_level: '',


   })
     useEffect(() =>{
      if(userId){
        const fetchUserData = async() =>{
          try{
            const response = await axios.get(`${buddyProfileUrl}/${userId}`);
            setFormData(response.data);
          } catch(error){
            console.error('Error Getting user data', error)
          }
        }
      }
     },[userId])

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


      const handleSubmit = async(e)=>{
        e.preventDefault();
       const token = localStorage.getItem('token')
       const dataToUpdate = new FormData();
       dataToUpdate.append('name', formData.name)
       dataToUpdate.append('password', formData.password);
       dataToUpdate.append('about', formData.about);
       dataToUpdate.append('riding_level', formData.riding_level);
       if (formData.profile_image) {
        dataToUpdate.append('profile_image', formData.profile_image);
      }
      try{
        await axios.put(`${buddyProfileUrl}/${userId}`, dataToUpdate, {       
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json' 
            }
          
        });
        if(handleSubmit){
          navigate(`${buddyProfileUrl}/${userId}`)
        }
      } catch(error){
        console.error('error submiting form', error)
      } };

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
           value={formData.about}
           onChange={handleChange}
          ></textarea>
           </label>
  
           <label className='update-label'>
            Update Password
           <input
           className='update-profile-input'
           type='text'
           name='update-password'
           placeholder='update-password'
           value={formData.password}
           onChange={handleChange}
          ></input>
          </label>
  
  
          <label className='update-label'>
              Update Riding Level
            <input
           className='update-profile-input'
           type='text'
           name='riding_level'
           placeholder='Riding Level'
           value={formData.riding_level}
           onChange={handleChange}
          ></input>
          </label>
          
          <div className='submit-update-box'>
              <button onClick={()=>navigate(`/profile/${userId}`)} className='update-profile-tbn' type="submit">Cancel</button>
              <button className='update-profile-tbn' type="submit">Update Profile</button>
          </div>
          </div>
      </form>
  
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