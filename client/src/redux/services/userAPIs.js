import axios from 'axios';

//Register User
export const SignupAPI = (credentials) => 
    axios.post('/api/users/register', credentials)
        .then(res => res.data)
        .catch(error => {throw error.response.data});

//Login User
export const LoginAPI = (credentials) => 
    axios.post('/api/users/login', credentials)
        .then(res => res.data)
        .catch(error => {throw error.response.data});
