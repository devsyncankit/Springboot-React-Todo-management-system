import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveLoggedInUser, storeToken } from '../services/AuthService'
import authService from '../services/AuthService';


const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const navigate = useNavigate();

  async  function handleLogin(e) {
        e.preventDefault();
        // Handle login logic here
        const credentials = { usernameOrEmail, password };
        console.log('Login credentials:', credentials);
        // You can add logic here to send the login data to the backend API for authentication
       await authService.login(credentials).then((response) => {
            console.log('Inside login response:');
            console.log('Login successful:', response);
           // const token = 'Basic ' + window.btoa(usernameOrEmail + ':' + password);
            const token ='Bearer ' + response.data.accessToken; // Assuming the token is returned in the response data
            console.log('Generated token:', token);
            storeToken(token); // Store the token in local storage or context for future use
            // Handle successful login (e.g., store token, redirect to dashboard)
            saveLoggedInUser(usernameOrEmail); // Save the logged-in user's information
            navigate('/todos'); // Redirect to the todos page after successful login
            console.log('Login successful, redirecting to todos page');
            window.location.reload(false); // Reload the page to update the UI based on the new authentication state
        }).catch((error) => {
            console.error('Login failed:', error);
            // Handle login failure (e.g., display error message)
        });
    }

  return (
    <div>
        <h2 className='text-center'>User Login</h2>
        <form>
            <div className='form-group mb-2'>
                <label htmlFor='username' className='form-label'>Username or Email</label>
                <input type='text' className='form-control' id='username' placeholder='Enter username or email' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
            </div>
            <div className='form-group mb-2'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' className='form-control' id='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit' className='btn btn-primary' onClick={(e) => handleLogin(e)} >Login</button>
        </form>
    </div>
  )
}

export default LoginComponent