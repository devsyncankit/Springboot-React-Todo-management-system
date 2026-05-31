import axios from 'axios';
import { getToken } from './AuthService';

const TODO_API_URL = 'http://localhost:8080/api/todos'; 

axios.interceptors.request.use(function (config) {

     console.log("Request URL:", config.url);
   // console.log("Token:", token);
     
        config.headers['Authorization'] = getToken(); // Assuming getToken() retrieves the token from local storage
    
    return config;
}, function (error) {
    return Promise.reject(error);
});

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