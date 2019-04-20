import jwt_decode from 'jwt-decode';
const accessToken = localStorage.getItem('accessToken');

export default {
    user: {
        isAuthenticated: !!accessToken,
        user: accessToken ? jwt_decode(accessToken) : null,
        isAuthenticating: false,
        errors: null,
    },
    products: {
        isFetchingProducts: false,
        products: [],

        productToEdit: null,

        isAddingProduct: false,
        isEditingProduct: false,
        isDeletingProduct: false,
        
        isAddProductModalVisible: false,
        isEditProductModalVisible: false,
        isDeleteProductConfirmationVisible: false,

        errors: null
    },
    orders: {
        cart: {},
        totalPrice: 0,
        isPlacingOrder: false,

        isFetchingUsersOrders: false,
        allUsersOrders: [],

        errors: null
    }
}