import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as ordersActions from '../actions/ordersActions';
import * as ordersAPIs from '../services/ordersAPIs';

function* fetchUsersOrders() {
	try {
		const fetchUsersOrdersResponse = yield call(ordersAPIs.FetchUsersOrdersAPI);
		yield put(ordersActions.FetchUsersOrdersSuccessAction(fetchUsersOrdersResponse));
	} catch (error) {
		console.log('error', error);
    	yield put(ordersActions.FetchUsersOrdersFailureAction(error));
	}
}

function* placeOrder() {
	const { cart, totalPrice } = yield select(state => state.orders);

	try {
		let orderDetails = Object.entries(cart).map(
			([productId, obj]) => ({ product: productId, quantity: obj.quantity }))
		
		const addProductResponse = yield call(ordersAPIs.PlaceOrderAPI, orderDetails, totalPrice);
		yield put(ordersActions.PlaceOrderSuccessAction(addProductResponse));
	} catch (error) {
		console.log('error', error);
    	yield put(ordersActions.PlaceOrderFailureAction(error));
	}
}


export function* watchFetchUsersOrders() {
	yield takeLatest(ordersActions.SGRD_FETCH_USERS_ORDERS_REQUEST, fetchUsersOrders);
}

export function* watchPlaceOrder() {
	yield takeLatest(ordersActions.SGRD_PLACE_ORDER_REQUEST, placeOrder);
}