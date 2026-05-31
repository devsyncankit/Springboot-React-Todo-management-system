import React from 'react'
import {NavLink} from "react-router-dom";
import { isUserLoggedIn, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();
    function handleLogout() {
        // Implementation for handling user logout
        // You can add logic here to clear authentication tokens, update state, and redirect to the login page   
        logout(); // Clear authentication tokens and update state 
        navigate('/login'); // Redirect to the login page after logout      
    console.log("Is user logged in?", isAuth);}
  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div><a href='https://localhost:3000' className='navbar-brand'>Todo App</a></div>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                       {/* {isAuth && <NavLink to="/" className="nav-link">Home</NavLink>} */}
                       {isAuth && <NavLink to="/todos" className="nav-link">Todos</NavLink>}
                       {isAuth && <NavLink to="/add-todo" className="nav-link">Add Todo</NavLink>}
                        {!isAuth && <NavLink to="/register" className="nav-link">Register</NavLink>}
                        {!isAuth && <NavLink to="/login" className="nav-link">Login</NavLink>}
                       {isAuth && <NavLink to="/logout" className="nav-link" onClick={handleLogout}>Logout</NavLink>}
                    </ul>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent