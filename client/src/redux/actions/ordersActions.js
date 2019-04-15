/* Action Types */
//Add product to cart
export const RD_ADD_PRODUCT_TO_CART = 'RD_ADD_PRODUCT_TO_CART';

/* Action Creators */
//Add product to cart
export const AddProductToCartAction = (product) => ({ type: RD_ADD_PRODUCT_TO_CART, product });
