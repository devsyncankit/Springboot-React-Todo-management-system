import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ListTodoComponent from './components/ListTodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponents from './components/FooterComponents'
import {BrowserRouter,Routes, Route,Navigate} from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn, saveLoggedInUser, logout } from './services/AuthService';

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn(); // Check if the user is authenticated
    return isAuth ? children : <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        // Define routes for the application
        //listTodos component will be rendered when the user navigates to "/" or "/todos"
        <Route path="/" element={<LoginComponent />} />
        <Route path="/todos" element={
          <AuthenticatedRoute>
            <ListTodoComponent />
          </AuthenticatedRoute>
          } />
        // Additional routes for adding, updating, deleting todos can be defined here
        <Route path="/add-todo" element={
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>
          } />
        <Route path="/update-todo/:id" element={
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>
          } />
        <Route path="/todos/delete/:id" element={
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>
          } />
        <Route path="/register" element={<RegisterComponent/>} />
        <Route path="/login" element={<LoginComponent/>} />
        <Route path="/logout" element={<LoginComponent/>} />
      </Routes>
      <FooterComponents />
    </BrowserRouter>
  )
}

export default App
