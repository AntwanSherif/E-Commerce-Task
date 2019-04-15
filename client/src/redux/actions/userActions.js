// Action Types
export const SGRD_REGISTER_USER_REQUEST = 'SGRD_REGISTER_USER_REQUEST';
export const RD_REGISTER_USER_SUCCESS = 'RD_REGISTER_USER_SUCCESS';
export const RD_REGISTER_USER_FAILURE = 'RD_REGISTER_USER_FAILURE';

export const SGRD_LOGIN_USER_REQUEST = 'SGRD_LOGIN_USER_REQUEST';
export const RD_LOGIN_USER_SUCCESS = 'RD_LOGIN_USER_SUCCESS';
export const RD_LOGIN_USER_FAILURE = 'RD_LOGIN_USER_FAILURE';

export const SGRD_LOGOUT_USER = 'SGRD_LOGOUT_USER';

export const RD_RESET_AUTH_ERRORS = 'RD_RESET_AUTH_ERRORS';


// Action Creators
export const registerUserRequestAction = (credentials) =>  ({ type: SGRD_REGISTER_USER_REQUEST, credentials });
export const registerUserSuccessAction = ({ accessToken, user }) =>  ({ type: RD_REGISTER_USER_SUCCESS, accessToken, user });
export const registerUserFailureAction = (error) =>  ({ type: RD_REGISTER_USER_FAILURE, error });

export const loginUserRequestAction = (credentials) =>  ({ type: SGRD_LOGIN_USER_REQUEST, credentials });
export const loginUserSuccessAction = ({ accessToken, user }) =>  ({ type: RD_LOGIN_USER_SUCCESS, accessToken, user });
export const loginUserFailureAction = (error) =>  ({ type: RD_LOGIN_USER_FAILURE, error });

export const logoutUserAction = () =>  ({ type: SGRD_LOGOUT_USER });

export const resetAuthErrorsAction = () =>  ({ type: RD_RESET_AUTH_ERRORS });