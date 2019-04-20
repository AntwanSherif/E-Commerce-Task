import * as ProductsActions from '../actions/productsActions'

const productsReducer = (state = {}, action) => {
    switch (action.type) {
        //Get all products
        case ProductsActions.SGRD_GET_ALL_PRODUCTS_REQUEST:
            return { ...state, isFetchingProducts: true }

        case ProductsActions.RD_GET_ALL_PRODUCTS_SUCCESS:
            return { 
                ...state, 
                isFetchingProducts: false,
                products: action.products
            }

        case ProductsActions.RD_GET_ALL_PRODUCTS_FAILURE:
            return { 
                ...state, 
                isFetchingProducts: false, 
                errors: { getAllProductsError: action.error }
            }

        //Add product
        case ProductsActions.SGRD_ADD_PRODUCT_REQUEST:
            return { ...state, isAddingProduct: true }

        case ProductsActions.RD_ADD_PRODUCT_SUCCESS:
            return { 
                ...state, 
                isAddingProduct: false,
            }

        case ProductsActions.RD_ADD_PRODUCT_FAILURE:
            return { 
                ...state, 
                isAddingProduct: false, 
                errors: { addProductError: action.error }
            }

        //Edit product
        case ProductsActions.SGRD_EDIT_PRODUCT_REQUEST:
            return { ...state, isEditingProduct: true, productToEdit: action.product }

        case ProductsActions.RD_EDIT_PRODUCT_SUCCESS:
            const ProductIndex = state.products.findIndex(product => product._id === action.product._id);

            return { 
                ...state, 
                products: [
                    ...state.products.slice(0, ProductIndex),
                    action.product,
                    ...state.products.slice(ProductIndex + 1),
                ],
                isEditingProduct: false,
                productToEdit: null
            }

        case ProductsActions.RD_EDIT_PRODUCT_FAILURE:
            return { 
                ...state, 
                isEditingProduct: false, 
                errors: { editProductError: action.error }
            }

        //Delete product
        case ProductsActions.SGRD_DELETE_PRODUCT_REQUEST:
            return { ...state, isDeletingProduct: true }

        case ProductsActions.RD_DELETE_PRODUCT_SUCCESS:
            const productsAfterDeletion = state.products.filter(product => product._id !== action.productId);
            
            return { 
                ...state, 
                isDeletingProduct: false,
                products: productsAfterDeletion
            }

        case ProductsActions.RD_DELETE_PRODUCT_FAILURE:
            return { 
                ...state, 
                isDeletingProduct: false, 
                errors: { deleteProductError: action.error }
            }
            
        //Show/Hide Add Product Modal
        case ProductsActions.RD_SHOW_ADD_PRODUCT_MODAL:
            return { ...state, isAddProductModalVisible: true };
    
        case ProductsActions.RD_HIDE_ADD_PRODUCT_MODAL:
            return { ...state, isAddProductModalVisible: false };

        //Show/Hide Edit Product Modal
        case ProductsActions.RD_SHOW_EDIT_PRODUCT_MODAL:
            return { ...state, isEditProductModalVisible: true, productToEdit: action.product };

        case ProductsActions.RD_HIDE_EDIT_PRODUCT_MODAL:
            return { ...state, isEditProductModalVisible: false, productToEdit: null };

        //Show/Hide Delete Product Confirmation
        case ProductsActions.RD_SHOW_DELETE_PRODUCT_CONFIRMATION:
            return { ...state, isDeleteProductConfirmationVisible: true };
    
        case ProductsActions.RD_HIDE_DELETE_PRODUCT_CONFIRMATION:
            return { ...state, isDeleteProductConfirmationVisible: false };
        

        default:
            return state;
    }
}

export default productsReducer;