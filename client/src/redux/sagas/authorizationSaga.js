import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import * as userActions from '../actions/userActions';
import * as userAPIs from '../services/userAPIs';
import { setAuthToken } from '../../utils/setAuthToken';

function* signup({ credentials }) {
	const isAuthenticated = yield select(state => state.user.isAuthenticated);

	if (!isAuthenticated) {
		try {
			const signupResponse = yield call(userAPIs.SignupAPI, credentials);
			const accessToken = yield signupResponse.accessToken;
			localStorage.setItem('accessToken', accessToken);
			setAuthToken(accessToken);

			yield put(userActions.registerUserSuccessAction(signupResponse));
			yield put(push('/'));
		} catch (error) {
			console.log('error', error);
    		yield put(userActions.registerUserFailureAction(error));
		}
	}
}

function* login({ credentials }) {
	const isAuthenticated = yield select(state => state.user.isAuthenticated);

	if (!isAuthenticated) {
		try {
			const loginResponse = yield call(userAPIs.LoginAPI, credentials);
			const accessToken = yield loginResponse.accessToken;
			localStorage.setItem('accessToken', accessToken);
			setAuthToken(accessToken);

			yield put(userActions.loginUserSuccessAction(loginResponse));
			yield put(push('/'));
		} catch (error) {
			console.log('error', error);
    		yield put(userActions.loginUserFailureAction(error));
		}
	}
}

function* logout() {
	localStorage.removeItem('accessToken');
	yield put(push('/'));
}


export function* watchSignup() {
	yield takeLatest(userActions.SGRD_REGISTER_USER_REQUEST, signup);
}

export function* watchLogin() {
	yield takeLatest(userActions.SGRD_LOGIN_USER_REQUEST, login);
}

export function* watchLogout() {
	yield takeLatest(userActions.SGRD_LOGOUT_USER, logout);
}