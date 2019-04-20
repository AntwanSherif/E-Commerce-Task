/* Action Types */
//Add product to cart
export const RD_ADD_TO_CART = 'RD_ADD_TO_CART';

//Remove product from cart
export const RD_REMOVE_FROM_CART = 'RD_REMOVE_FROM_CART';

//Place Order
export const SGRD_PLACE_ORDER_REQUEST = 'SGRD_PLACE_ORDER_REQUEST'
export const RD_PLACE_ORDER_SUCCESS = 'RD_PLACE_ORDER_SUCCESS'
export const RD_PLACE_ORDER_FAILURE = 'RD_PLACE_ORDER_FAILURE'

//Fetch Users Orders
export const SGRD_FETCH_USERS_ORDERS_REQUEST = 'SGRD_FETCH_USERS_ORDERS_REQUEST'
export const RD_FETCH_USERS_ORDERS_SUCCESS = 'RD_FETCH_USERS_ORDERS_SUCCESS'
export const RD_FETCH_USERS_ORDERS_FAILURE = 'RD_FETCH_USERS_ORDERS_FAILURE'

//Show warning when the user try to add the product more than the available stock quantity
export const RD_SHOW_INSUFFICIENT_STOCK_QUANTITY_WARNING = 'RD_SHOW_INSUFFICIENT_STOCK_QUANTITY_WARNING';


/* Action Creators */
//Add product to cart
export const AddToCartAction = (product) => ({ type: RD_ADD_TO_CART, product });

//Remove product from cart
export const RemoveFromCartAction = (productId) => ({ type: RD_REMOVE_FROM_CART, productId });

//Place Order
export const PlaceOrderRequestAction = () => ({ type: SGRD_PLACE_ORDER_REQUEST });
export const PlaceOrderSuccessAction = () => ({ type: RD_PLACE_ORDER_SUCCESS });
export const PlaceOrderFailureAction = (error) => ({ type: RD_PLACE_ORDER_FAILURE, error });

//Fetch Users Orders
export const FetchUsersOrdersRequestAction = () => ({ type: SGRD_FETCH_USERS_ORDERS_REQUEST });
export const FetchUsersOrdersSuccessAction = (orders) => ({ type: RD_FETCH_USERS_ORDERS_SUCCESS, orders });
export const FetchUsersOrdersFailureAction = (error) => ({ type: RD_FETCH_USERS_ORDERS_FAILURE, error });

//Show Insuffecient product quantity warning
export const ShowInsufficientStockQuantityWarningAction = () => ({ type: RD_SHOW_INSUFFICIENT_STOCK_QUANTITY_WARNING });
