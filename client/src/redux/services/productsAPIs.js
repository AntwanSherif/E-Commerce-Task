import axios from 'axios';

//Get all products
export const GetProductsAPI = () =>
    axios.get('/api/products')
    .then(res => res.data)
    .catch(error => { throw error.response.data });


//Add product
export const AddProductAPI = (productDetails) => 
    axios.post('/api/products', productDetails)
    .then(res => res.data)
    .catch(error => { throw error.response.data });


    //Edit product
export const EditProductAPI = (product) => 
axios.put('/api/products', product)
.then(res => res.data)
.catch(error => { throw error.response.data });


//Delete product
export const DeleteProductAPI = (productId) => 
    axios.delete(`/api/products/${productId}`)
    .then(res => res.data)
    .catch(error => { throw error.response.data });