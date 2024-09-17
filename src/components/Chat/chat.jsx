import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsSend } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import './chat.scss';


const buddyUrl = 'http://localhost:8080';
function Chat() {
 const {postId, userId} = useParams()

 const [message, setMessage] = useState ([]);
 const [newMessage, setNewMessage] = useState('');
 const [editMessageId, setEditMessageId]= useState(null);
 const [editMessageText, setEditMessageText] = useState('');
const messagesEndRef = useRef(null);
  
  useEffect(()=> {
    const fetchMessages = async () => {
      try{
        const response = await axios.get(`${buddyUrl}/chats/${postId}`);
        setMessage(response.data);
      } catch(error){
        console.error('error fetching messages:', error);
      }
    }

     fetchMessages();
     const interval = setInterval(fetchMessages, 1000);
     return() => clearInterval(interval)
  }, [postId, userId]);

   
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

   const handleSendMessage = async ()=> {
    if (newMessage.trim() === '') { 
      console.error('Cannot send an empty message');
      return; 
    }
    try{
      await axios.post(`${buddyUrl}/chats`, {
        post_id:postId,
        user_id: userId,
        message: newMessage,
      });
      setNewMessage('');
    } catch(error){
      console.error('error sending message', error);
    }
   };


   const handleEditMessage = (messageId, messageText) => {
    setEditMessageId(messageId);
    setEditMessageText(messageText);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${buddyUrl}/chats/${editMessageId}`, {
        message: editMessageText,
      });
      setMessage(message.map(msg => 
        msg.id === editMessageId ? { ...msg, message: editMessageText } : msg
      ));
      setEditMessageId(null);
      setEditMessageText('');
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };
  const handleDeleteMessage = async(messageId) =>{
    try{
      await axios.delete(`${buddyUrl}/chats/${messageId}`);
      setMessage(message.filter(msg => msg.id !== messageId));
    } catch(error){
      console.error('Error deliting message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };





  return (
    <div className="chat-container">
      <h1 className='title-chat'>Chat</h1>
      <div className="chat-messages">
        {message.map((msg) => (
          <div key={msg.id} className="message">
            <div className='chat-img-timestamp'> 
                <img className='img-chat' src={`${buddyUrl}${msg.profile_image}`} alt={msg.name} />
                <span className="timestamp">{formatTimestamp(msg.created_at)}</span>
            </div>
            <div>
              <p className='chat-name'>{msg.name}</p> 
              {editMessageId === msg.id ? (
                <div>
                  <input
                    type="text"
                    value={editMessageText}
                    onChange={(e) => setEditMessageText(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditMessageId(null)}>Cancel</button>
                </div>
              ) : (
                <p className='chat-msg'>{msg.message}</p>
              )}
              {Number(msg.user_id) === Number(userId) && (
                <div className="message-btns-container">
                  <button
                   className='chat-btn chat-btn__edit'
                    onClick={() => handleEditMessage(msg.id, msg.message)}
                    ><CiEdit />
                    </button>
                  <button 
                  className='chat-btn chat-btn__delete' 
                  onClick={() => handleDeleteMessage(msg.id)}>
                    X
                    </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="new-message">
        <input
          className='chat-send-input'
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className='chat-send-btn' disabled={newMessage.trim() === ''}  onClick={handleSendMessage}><BsSend/></button>
      </div>
    </div>)
}

export default Chat