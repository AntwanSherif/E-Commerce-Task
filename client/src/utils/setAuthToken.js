import axios from 'axios';

/* Configure Axios to add Authorization header to all api requests */
export const setAuthToken = token => {
    if(token) {
	    axios.defaults.headers.common['Authorization'] = token;
    } else {
	    delete axios.defaults.headers.common['Authorization'];
    }
}