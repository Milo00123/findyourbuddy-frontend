import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Password.scss';
import { PiEyeLight, PiEyeSlash  } from "react-icons/pi";
const buddyProfileUrl = 'http://localhost:8080/profile';

function Password() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple frontend validation for password match
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const response = await axios.put(`${buddyProfileUrl}/password/${userId}`, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            }, { withCredentials: true });

            console.log('Password updated successfully:', response.data);
            navigate(`/profile/${userId}`);
        } catch (error) {
            setError('Error updating password. ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="password-update-wrap">
            <h2 className='update-password-title'>Update Password</h2>
            <label className='eye-password' htmlFor='show-password'>
            {showPassword ? <PiEyeSlash/> :<PiEyeLight/> }
            <input
              className='show-password'
              type='checkbox'
              id='show-password'
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          </label>
            {error && <p className="error-msg">{error}</p>}
            <form className='update-password-form' onSubmit={handleSubmit}>
                <label className='update-password-label'>
                    Current Password:
                    <input
                       className='input-update-password'
                       type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className='update-password-label'>
                    New Password:
                    <input
                        className='input-update-password'
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className='update-password-label'>
                    Confirm New Password:
                    <input
                        className='input-update-password'
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className='update-password-btn' type="submit">Update Password</button>
            </form>
            <button className='update-password-cancel'
            onClick={()=>{navigate(`/profile/${userId}/Profile-settings`)}}>Cancel</button>
        </div>
    );
}

export default Password;
