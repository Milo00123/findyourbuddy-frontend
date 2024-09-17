import React, { useState } from 'react'
import './Pool.scss';
import { useParams } from 'react-router-dom';
import PoolPost from '../Pool-post/PoolPost';
import axios from 'axios';
import { useEffect } from 'react';
import { TbHandClick } from "react-icons/tb";





const buddyUrl ='http://localhost:8080';

      function Pool() {

      const {userId} = useParams();
      const [poolData, setPoolData]= useState(null);
      const [loading, setLoading] = useState(true);
      const [posts, setPosts] = useState([]);
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [location, setLocation]= useState('');
      const [isVisible, setIsVisible] = useState(false);
      
      const getProfile = async ()=>{
      try{
        const response = await axios.get(`${buddyUrl}/profile/${userId}`)
        setPoolData(response.data)
      } catch(error){
        console.error('error fetching profile', error)
      }finally {
        setLoading(false);
      }
             }; 

            useEffect(() => {
              if (userId) {
                  getProfile(userId);
              }
          }, [userId]);  

          
          if (loading) 
              return <div className='loaging'>Loading...</div>;  
          if (!poolData) 
              return <div>No profile data</div>;


          const handleCreatePost = async (e) => {
            e.preventDefault();
            try {
              const token = localStorage.getItem('token');

              if (!token) {
                console.error('Token is missing');
                return;
              }
              const response = await axios.post(`${buddyUrl}/posts`, {
                title,
                content,
                location,
                user_id: userId,
                profile_image: poolData.profile_image,
                name: poolData.name,
                created_at: new Date().toISOString(),
              });
              const newPost =  response.data;
              setPosts([{ ...newPost, title, content,location, profile_image: poolData.profile_image, name: poolData.name, created_at: new Date().toISOString() },  ...posts]);
              setTitle('');
              setContent('');
              setLocation('')
            } catch (error) {
              console.error('Error creating post:', error);
            }
          };

          const showForm = ()=>{
            setIsVisible(!isVisible);
           }

  return (<>
    <div className='pool-container'>
    <div>
        <h1 className='pool-title'>Welcome to the Pool {poolData.name}!</h1>
        
      </div>

        <form  className='pool-form' onSubmit={handleCreatePost}>
        <img alt='profile_img' className='pool-avatar' src={`${buddyUrl}${poolData.profile_image}`} />
           
               
                <div className='pool-form-input'>
                      <div className={`show-form ${isVisible ? 'form-visible' : 'form-hidden'}`}
               onClick={showForm}>{isVisible ? 'X'
                : 'keen for a plan ?'
              } </div>
                {isVisible && (<>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} required
                    className='pool-input'
                    placeholder='location'>    
                 </input>
                <input
                    type="text"
                    value={title}
                     onChange={(e) => setTitle(e.target.value)} required
                    className='pool-input'
                    placeholder='Pool title'>    
                 </input>
               
                <input             
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} required 
                    className='pool-input pool-input__plan' 
                    placeholder='What is the plan?'>
                </input>
                <button className='pool-form-btn'>POST</button>
                </> )} 
                </div>
          
        </form>
        <div>

        </div>
        <PoolPost  posts={posts} setPosts={setPosts}  />
    </div>
    </>)
}

export default Pool