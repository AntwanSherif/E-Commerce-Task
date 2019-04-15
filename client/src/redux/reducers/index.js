// // import session from './AuthorizationReducer'

// const sliceReducers = [
// //   session,
// ];

// export default sliceReducers;

import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import user from './userReducer';
import products from './productsReducer';
import orders from './ordersReducer';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user,
    products,
    orders
});

export default rootReducer;
