import * as OrdersActions from '../actions/ordersActions';

const ordersReducer = (state = {}, action) => {
    switch (action.type) {
        //Add product to cart
        case OrdersActions.RD_ADD_PRODUCT_TO_CART:
            return { 
                ...state, 
                cart: [...state.cart, action.product] 
            }

        default:
            return state;
    }
}

export default ordersReducer;