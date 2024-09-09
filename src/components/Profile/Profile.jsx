import React from 'react'
import { useParams } from 'react-router-dom';

function Profile() {
  const {userId}= useParams();
  return (
    <div>Profile</div>
  )
}

export default Profile