/* Action Types */
//Get all products
export const SGRD_GET_ALL_PRODUCTS_REQUEST = 'SGRD_GET_ALL_PRODUCTS_REQUEST';
export const RD_GET_ALL_PRODUCTS_SUCCESS = 'RD_GET_ALL_PRODUCTS_SUCCESS';
export const RD_GET_ALL_PRODUCTS_FAILURE = 'RD_GET_ALL_PRODUCTS_FAILURE';

//Add product
export const SGRD_ADD_PRODUCT_REQUEST = 'SGRD_ADD_PRODUCT_REQUEST';
export const RD_ADD_PRODUCT_SUCCESS = 'RD_ADD_PRODUCT_SUCCESS';
export const RD_ADD_PRODUCT_FAILURE = 'RD_ADD_PRODUCT_FAILURE';

//Edit product
export const SGRD_EDIT_PRODUCT_REQUEST = 'SGRD_EDIT_PRODUCT_REQUEST';
export const RD_EDIT_PRODUCT_SUCCESS = 'RD_EDIT_PRODUCT_SUCCESS';
export const RD_EDIT_PRODUCT_FAILURE = 'RD_EDIT_PRODUCT_FAILURE';

//Delete product
export const SGRD_DELETE_PRODUCT_REQUEST = 'SGRD_DELETE_PRODUCT_REQUEST';
export const RD_DELETE_PRODUCT_SUCCESS = 'RD_DELETE_PRODUCT_SUCCESS';
export const RD_DELETE_PRODUCT_FAILURE = 'RD_DELETE_PRODUCT_FAILURE';

//Show/Hide Add Product Modal
export const RD_SHOW_ADD_PRODUCT_MODAL = 'RD_SHOW_ADD_PRODUCT_MODAL';
export const RD_HIDE_ADD_PRODUCT_MODAL = 'RD_HIDE_ADD_PRODUCT_MODAL';

//Show/Hide Edit Product Modal
export const RD_SHOW_EDIT_PRODUCT_MODAL = 'RD_SHOW_EDIT_PRODUCT_MODAL';
export const RD_HIDE_EDIT_PRODUCT_MODAL = 'RD_HIDE_EDIT_PRODUCT_MODAL';

//Show/Hide Delete Product confirmation
export const RD_SHOW_DELETE_PRODUCT_CONFIRMATION = 'RD_SHOW_DELETE_PRODUCT_CONFIRMATION';
export const RD_HIDE_DELETE_PRODUCT_CONFIRMATION = 'RD_HIDE_DELETE_PRODUCT_CONFIRMATION';


/* Action Creators */
//Get all products
export const GetAllProductsRequestAction = () => ({ type: SGRD_GET_ALL_PRODUCTS_REQUEST });
export const GetAllProductsSuccessAction = (products) => ({ type: RD_GET_ALL_PRODUCTS_SUCCESS, products });
export const GetAllProductsFailureAction = (error) => ({ type: RD_ADD_PRODUCT_FAILURE, error });

//Add product
export const AddProductRequestAction = (productDetails) => ({ type: SGRD_ADD_PRODUCT_REQUEST, productDetails });
export const AddProductSuccessAction = (product) => ({ type: RD_ADD_PRODUCT_SUCCESS, product });
export const AddProductFailureAction = (error) => ({ type: RD_ADD_PRODUCT_FAILURE, error });

//Edit product
export const EditProductRequestAction = (product) => ({ type: SGRD_EDIT_PRODUCT_REQUEST, product });
export const EditProductSuccessAction = (product) => ({ type: RD_EDIT_PRODUCT_SUCCESS, product });
export const EditProductFailureAction = (error) => ({ type: RD_EDIT_PRODUCT_FAILURE, error });

//Delete product
export const DeleteProductRequestAction = (productId) => ({ type: SGRD_DELETE_PRODUCT_REQUEST, productId });
export const DeleteProductSuccessAction = (productId) => ({ type: RD_DELETE_PRODUCT_SUCCESS, productId });
export const DeleteProductFailureAction = (error) => ({ type: RD_DELETE_PRODUCT_FAILURE, error });

//Show/Hide Add Product Modal
export const ShowAddProductModalAction = () => ({ type: RD_SHOW_ADD_PRODUCT_MODAL });
export const HideAddProductModalAction = () => ({ type: RD_HIDE_ADD_PRODUCT_MODAL });

//Show/Hide Edit Product Modal
export const ShowEditProductModalAction = (product) => ({ type: RD_SHOW_EDIT_PRODUCT_MODAL, product });
export const HideEditProductModalAction = () => ({ type: RD_HIDE_EDIT_PRODUCT_MODAL });

//Show/Hide Delete Product confirmation
export const ShowDeleteProductConfirmationAction = () => ({ type: RD_SHOW_DELETE_PRODUCT_CONFIRMATION });
export const HideDeleteProductConfirmationAction = () => ({ type: RD_HIDE_DELETE_PRODUCT_CONFIRMATION });