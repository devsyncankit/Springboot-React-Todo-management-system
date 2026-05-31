import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';

const RegisterComponent = () => {

    const[name, setName] =useState('');
    const[email, setEmail] =useState('');
    const[password, setPassword] =useState('');
   // const[confirmPassword, setConfirmPassword] =useState('');
    const[username, setUsername] =useState('');
    const navigate = useNavigate();

    function handleRegistrationForm(e) {
        e.preventDefault();
        // Implementation for handling user registration form submission
        const registrationData = { name, username, email, password };
        console.log('Registration data:', registrationData);
        // You can add logic here to send the registration data to the backend API for processing
        authService.register(registrationData).then((response) => {
            console.log('Registration successful:', response);
            // Handle successful registration (e.g., redirect to login page)
            navigate('/login');
        }).catch((error) => {
            console.error('Registration failed:', error);
            // Handle registration failure (e.g., display error message)
        });
    }
  return (
    <div>
        <h2 className='text-center'>User Registration</h2>
        <form>
            <div className='form-group mb-2'>
                <label className='form-label'>Name:</label>
                <input 
                    type="text" 
                    className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
                        <div className='form-group mb-2'>
                <label className='form-label'>Username:</label>
                <input 
                    type="text" 
                    className='form-control'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input 
                    type="email" 
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='form-group mb-2'>
                <label className='form-label'>Password:</label>
                <input 
                    type="password" 
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {/* <div className='form-group mb-2'>
                <label className='form-label'>Confirm Password:</label>
                <input 
                    type="password" 
                    className='form-control'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div> */}
            <div className='form-group mb-2'>
                <button className='btn btn-success' type='submit' onClick={(e)=> handleRegistrationForm(e)}>Register</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterComponent