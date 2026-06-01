import React, { useState, useEffect } from 'react'
import todoService from '../services/TodoServices';
import { useNavigate } from 'react-router-dom';
import { isUserAdmin } from '../services/AuthService';


const ListTodoComponent = () => {

    const [todos, setTodos] = useState([]);

    const navigator = useNavigate();  
    
    const isAdmin = isUserAdmin(); // Check if the user has admin privileges

    useEffect(() => {
        console.log('Fetching todos from backend API...');
        // Fetch todos from backend API
        //it will call the listTodos function when the component is first rendered
       listTodos();
    }, []);

    function listTodos() {
        console.log('Refreshing todo list...');
        // This function can be used to refresh the list of todos after adding/updating/deleting
        todoService.getTodos()
            .then(response => response.data)
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching todos:', error));
    }
    function addNewTodo() {
        // Implementation for adding a new todo
        navigator('/add-todo');
      
    }
    function editTodo(id) {
        // Implementation for editing a todo
        navigator(`/update-todo/${id}`);
    }
    function deleteTodo(id) {
        // Implementation for deleting a todo
        todoService.deleteTodo(id)
            .then(() => {
                // Refresh the todo list after deletion
                listTodos();
            })
            .catch(error => console.error('Error deleting todo:', error));
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Todo List</h2>
        <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
        <div className='row'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'Yes' : 'No'}</td>
                                <td>
                                    {isAdmin && ( // Only show edit and delete buttons if the user is an admin
                                        <>
                                            <button className='btn btn-info' onClick ={e => editTodo(todo.id)}>Edit</button>
                                            <button className='btn btn-danger' onClick ={e => deleteTodo(todo.id)}>Delete</button>
                                        </>
                                    )}
                                    <button className='btn btn-success' onClick ={e => todoService.CompleteTodo(todo.id).then(() => listTodos())}>Complete</button>
                                    <button className='btn btn-warning' onClick ={e => todoService.IncompleteTodo(todo.id).then(() => listTodos())}>Incomplete</button>
                                </td>
                            </tr>
                        )
                    
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListTodoComponent