import * as OrdersActions from '../actions/ordersActions';

const ordersReducer = (state = {}, action) => {
    const cartProducts = state.cart;
    let productId;
    let totalPrice = 0;

    switch (action.type) {
        //Add product to cart
        case OrdersActions.RD_ADD_TO_CART:
            productId = action.product._id;

            //Check if product is already added to cart
            if(productId in cartProducts) {
                //increase quantity & re-calculate total price
                let quantity = ++cartProducts[productId].quantity;
                cartProducts[productId].totalPrice = cartProducts[productId].price * quantity;
            } else {
                cartProducts[productId] = { 
                    ...action.product, 
                    quantity: 1,
                    totalPrice: action.product.price
                };
            }

            //calculate totalPrice
            totalPrice = Object.values(cartProducts).reduce((acc, item) => acc + item.totalPrice, 0);
            
            return { 
                ...state, 
                cart: cartProducts,
                totalPrice
            }

        //Remove product from cart
        case OrdersActions.RD_REMOVE_FROM_CART:
            delete cartProducts[action.productId];
            
            //calculate totalPrice
            if(Object.keys(cartProducts).length) {
                totalPrice = Object.values(cartProducts).reduce((acc, item) => acc + item.totalPrice, 0)
            }

            return {
                ...state,
                cart: cartProducts,
                totalPrice
            }


        //Place Order
        case OrdersActions.SGRD_PLACE_ORDER_REQUEST:
            return { ...state, isPlacingOrder: true }

        case OrdersActions.RD_PLACE_ORDER_SUCCESS:
            return { ...state, isPlacingOrder: false, cart: {} } 

        case OrdersActions.RD_PLACE_ORDER_FAILURE:
            return { ...state, isPlacingOrder: false, errors: { placeOrderError: action.error } }
        

        //Fetch Users Orders
        case OrdersActions.SGRD_FETCH_USERS_ORDERS_REQUEST:
            return { ...state, isFetchingUsersOrders: true }

        case OrdersActions.RD_FETCH_USERS_ORDERS_SUCCESS:
            return { ...state, isFetchingUsersOrders: false, allUsersOrders: action.orders }

        case OrdersActions.RD_FETCH_USERS_ORDERS_FAILURE:
            return { ...state, isFetchingUsersOrders: false, errors: { fetchUsersOrdersError: action.error } }
        
        
        default:
            return state;
    }
}

export default ordersReducer;