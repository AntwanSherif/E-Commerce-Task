import axios from 'axios';

//Place order
export const PlaceOrderAPI = (productDetails, totalPrice) => 
    axios.post('/api/orders', { orderDetails: productDetails, totalPrice: totalPrice })
    .then(res => res.data)
    .catch(error => { throw error.response.data });

//Fetch users orders
export const FetchUsersOrdersAPI = () => 
    axios.get('/api/orders')
    .then(res => res.data)
    .catch(error => { throw error.response.data });