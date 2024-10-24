import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';
import './PoolPost.scss';
import { CiEdit } from "react-icons/ci";
import { MdGroupAdd } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import defaultImage from '../../Assets/Logo/Find your Buddy (6).png';

const buddyUrl ='https://findyourbuddy-server-f2e3d00ed8ad.herokuapp.com';

function PoolPost({ posts, setPosts, level}) {

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(null);
  const [isDeleting, setIsDeleting]= useState(null)
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const userId = parseInt(localStorage.getItem('userId'), 10);

  const handleButtonClick = (buttonName) => {

    setActiveButton(buttonName);
    setPosts([]);

  };
  
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${buddyUrl}/posts`);
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [setPosts]);

  useEffect(() => {
    fetchPosts();

  }, [fetchPosts]);

  const fetchUserPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${buddyUrl}/posts/user/${userId}/posts`);
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  }, [setPosts, userId]);

  const fetchUserChatPosts = useCallback(async () => {

    try {
      const response = await axios.get(`${buddyUrl}/posts/user/${userId}/posts-with-messages`);
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching user chat posts:', error);
    }
  }, [setPosts, userId]);

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const timePost = (dateString) => {
  const timeZone = 'America/Vancouver';
  return isValidDate(dateString) ? formatInTimeZone(dateString, timeZone, 'yyyy-MM-dd hh:mm a') : 'Invalid date';
};


        const handleDelete = async (postId) => {
          try {
            await axios.delete(`${buddyUrl}/posts/${postId}`, {
              data: { user_id: userId }, 
            });
            setPosts(posts.filter(post => post.id !== postId));
            setIsDeleting(null);
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        };

      const handleEdit = (post) => {
        setIsEditing(post.id);
        setEditTitle(post.title);
        setEditContent(post.content);
      };

      const handleSaveEdit = async (postId) => {
        try {
          await axios.put(`${buddyUrl}/posts/${postId}`, {
            title: editTitle,
            content: editContent,
            user_id: userId,
          },);
          setPosts(posts.map(post => post.id === postId ? { ...post, title: editTitle, content: editContent } : post));
          setIsEditing(null);
        } catch (error) {
          console.error('Error updating post:', error);
        }
      };
      
      const handleDeleteConfirmation = (postId) => {
        setIsDeleting(postId);
      };
    
      const cancelDelete = () => {
        setIsDeleting(null);
      };

      const handleJoinClick = (postId) => {
        navigate(`/chat/${userId}/${postId}`);
      };


  return ( <>
    <div className='pool-post-wrap'>

      <div className='btn-post-wrap'>
      <button className={`posts-btn ${activeButton === 'userPosts' ? 'active' : ''}`}
           onClick={() => {
            handleButtonClick('userPosts');
            fetchUserPosts();
          }}
        >
      
          My Posts
        </button>
        <button className={`posts-btn ${activeButton === 'allPosts' ? 'active' : ''}`}
          onClick={() => {
            handleButtonClick('allPosts');
            fetchPosts();
          }}
        >
          All Posts
        </button>
    <button className={`posts-btn ${activeButton === 'chatPosts' ? 'active' : ''}`}
      onClick={() => {
        handleButtonClick('chatPosts');
        fetchUserChatPosts();
      }}
    >
          My Chats
        </button>

        </div>
        
      {posts.map(post => (
        <div key={post.id} className='pool-post-container'>
          <div className='edit-delete-btns'>
            {post.user_id === userId && (
              <>
                {isEditing === post.id ? (
                  <>
                    <button 
                          className='pool-post-btn pool-post-btn__save' 
                          onClick={() => handleSaveEdit(post.id)}
                          >Save
                     </button>
                    <button 
                          className='pool-post-btn pool-post-btn__cancel' 
                          onClick={() => setIsEditing(null)}
                          >Cancel
                    </button>
                  </>
                   ) : isDeleting === post.id ? (
                      <>
                        <button 
                              className='pool-post-btn pool-post-btn__confirm'
                              onClick={() => handleDelete(post.id)}
                              >Confirm Delete
                         </button>
  
                         <button 
                             className='pool-post-btn pool-post-btn__cancel' 
                             onClick={cancelDelete}>
                             Cancel
                          </button>
                      </>
  
                          ) : (
                              <button 
                                  className='pool-post-btn pool-post-btn__edit' 
                                  onClick={() => handleEdit(post)}>
                                  <CiEdit />
                          </button>
                          )}
                     <button 
                          className='pool-post-btn pool-post-btn__delete' 
                          onClick={() => handleDeleteConfirmation(post.id)}>
                         x
                   </button>
              </>
            )}
          </div>
          <div className='inner-post-container'>
            <img src={post.profile_image ? `${buddyUrl}${post.profile_image}` : `${defaultImage}`} alt={`${post.name}'s profile`} className="pool-post-img" />
            <div className='location-timestamp-box'>
          
                <div className='location-post'>{post.location} <HiLocationMarker className='location-icon'/></div>
                <div className='location-post'>{level}</div>
                <div className='pool-post-timestamp'>{timePost(post.created_at)}</div>
           </div>
          </div>
          <div className='pool-post-name'>{post.name}</div>
          <div className='pool-post-content'>
            {isEditing === post.id ? (
              <>
                <input
                 className='title-post-edit'
                 placeholder='Update title'
                 value={editTitle}
                 onChange={(e) => setEditTitle(e.target.value)} />
  
                <textarea
                  className='content-post-edit'
                  placeholder='Update post'
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)} />
              </>
            ) : (
              <>
                <p className='pool-post-title'>{post.title}</p>
                <p className='pool-post-comment'>{post.content}</p>
              </>
            )}
          </div>
          <div className='join-btn-container'>
          <button className='pool-join-btn' onClick={() => handleJoinClick(post.id)}>Join <MdGroupAdd />

          </button>
          </div>
        </div>
      ))}
      </div>
    </>
     )
}

export default PoolPost