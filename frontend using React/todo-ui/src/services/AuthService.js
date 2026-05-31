import axios from "axios";


const AUTH_API_URL = 'http://localhost:8080/api/auth';



const authService = { 
    register: (userData) => {
        return axios.post(`${AUTH_API_URL}/register`, userData);
        
    },
    login: (credentials) => {
        return axios.post(`${AUTH_API_URL}/login`, credentials);
        
    }
};

export const storeToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const saveLoggedInUser = (username) => {
    sessionStorage.setItem('loggedInUser', username);
};

export const getLoggedInUser = () => {
    return sessionStorage.getItem('loggedInUser');
};

export const logout = () => {
    localStorage.clear(); // Clear all local storage items, including the token
    sessionStorage.clear(); // Clear all session storage items, including the logged-in user
    // Reload the page to update the UI based on the new authentication state
};
export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem('loggedInUser');
    if (username === null) {
        return false;
    }
    return true;
};

export default authService;