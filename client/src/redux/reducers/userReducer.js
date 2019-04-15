import jwt_decode from 'jwt-decode';
import * as userActions from '../actions/userActions';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case userActions.SGRD_REGISTER_USER_REQUEST:
        case userActions.SGRD_LOGIN_USER_REQUEST:
            return { ...state, isAuthenticating: true };

        case userActions.RD_REGISTER_USER_SUCCESS:
        case userActions.RD_LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                user: jwt_decode(action.accessToken),
            };

        case userActions.RD_REGISTER_USER_FAILURE:
        case userActions.RD_LOGIN_USER_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                errors: action.error
            }

        case userActions.SGRD_LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        case userActions.RD_RESET_AUTH_ERRORS:
            return {
                ...state,
                errors: null
            }

        default:
            return state;
    }
}

export default userReducer;