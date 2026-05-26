import axios from 'axios';

const TODO_API_URL = 'http://localhost:8080/api/todos'; 

const todoService = {
    getTodos: () => {
        return axios.get(TODO_API_URL);
    },
    getTodo: (id) => {
        return axios.get(`${TODO_API_URL}/${id}`);
    },
    createTodo: (todo) => {
        return axios.post(TODO_API_URL, todo);
    },
    updateTodo: (id, todo) => {
        return axios.put(`${TODO_API_URL}/${id}`, todo);
    },
    deleteTodo: (id) => {
        return axios.delete(`${TODO_API_URL}/${id}`);
    },
    CompleteTodo: (id) => {
        return axios.patch(`${TODO_API_URL}/${id}/complete`);
     },
        IncompleteTodo: (id) => {
        return axios.patch(`${TODO_API_URL}/${id}/incomplete`);
     }
};

export default todoService;