import React ,{useState,useEffect} from 'react'
import todoService from '../services/TodoServices';
import { useNavigate ,useParams} from 'react-router-dom';


const TodoComponent = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
 function addOrUpdateTodo(e) {
    e.preventDefault();
    // Implementation for saving the todo (either creating a new one or updating an existing one)
    const todoData = { title, description, completed };
    console.log('Saving todo:', todoData);
    if (id) {
        // Update existing todo
        todoService.updateTodo(id, todoData).then(response => {
            console.log('Todo updated successfully:', response.data);
            // You can add logic here to navigate back to the list or show a success message
            navigate('/todos');
        }).catch(error => {
            console.error('Error updating todo:', error);
        });
    } else {
        // Create new todo
        todoService.createTodo(todoData).then(response => {
            console.log('Todo saved successfully:', response.data);
            // You can add logic here to navigate back to the list or show a success message
            navigate('/todos');
        }).catch(error => {
            console.error('Error saving todo:', error);
            // You can add logic here to show an error message to the user
            navigate('/todos');
        });
    }
  }

  function pageTitle() {
    if (id) {
        return <h2 className='text-center'>Update Todo</h2>
    } else {
        return <h2 className='text-center'>Add Todo</h2>
    }
  }
  useEffect(() => {
    if (id) {
        // Fetch the existing todo details and populate the form for editing
        todoService.getTodo(id).then(response => {
            const { title, description, completed } = response.data;
            setTitle(title);
            setDescription(description);
            setCompleted(completed);
        }).catch(error => {
            console.error('Error fetching todo details:', error);
        });
    }
  }, [id]);

  return (
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Title:</label>
                                <input type="text" className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Description:</label>
                                <input type="text" className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Completed:</label>
                                <input type="checkbox" className='form-check-input' checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                            </div>
                        </form>
                        <button className='btn btn-success' onClick={(e) => addOrUpdateTodo(e)}>Save</button>
                    </div>
                 </div>
            </div>
        
    </div>
  )
}

export default TodoComponent