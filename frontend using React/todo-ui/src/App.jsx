import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ListTodoComponent from './components/ListTodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponents from './components/FooterComponents'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import TodoComponent from './components/TodoComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        // Define routes for the application
        //listTodos component will be rendered when the user navigates to "/" or "/todos"
        <Route path="/" element={<ListTodoComponent />} />
        <Route path="/todos" element={<ListTodoComponent />} />
        // Additional routes for adding, updating, deleting todos can be defined here
        <Route path="/add-todo" element={<TodoComponent />} />
        <Route path="/update-todo/:id" element={<TodoComponent />} />
        <Route path="/todos/delete/:id" element={<TodoComponent />} />
      </Routes>
      <FooterComponents />
    </BrowserRouter>
  )
}

export default App
