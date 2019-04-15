import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as productsActions from '../actions/productsActions';
import * as productsAPIs from '../services/productsAPIs';

function* getAllProducts() {
	try {
		const getProductsResponse = yield call(productsAPIs.GetProductsAPI);
		yield put(productsActions.GetAllProductsSuccessAction(getProductsResponse));
	} catch (error) {
		console.log('error', error);
    	yield put(productsActions.GetAllProductsFailureAction(error));
	}
}

function* addProduct({ productDetails }) {
	try {
		const addProductResponse = yield call(productsAPIs.AddProductAPI, productDetails);
		yield put(productsActions.AddProductSuccessAction(addProductResponse));
		yield put(productsActions.HideAddProductModalAction());
		
		//Fetch all products again
		yield put(productsActions.GetAllProductsRequestAction());
	} catch (error) {
		console.log('error', error);
    	yield put(productsActions.AddProductFailureAction(error));
	}
}

function* deleteProduct({ productId }) {
	try {
		const deleteProductResponse = yield call(productsAPIs.DeleteProductAPI, productId);
		yield put(productsActions.DeleteProductSuccessAction(productId));
		yield put(productsActions.HideDeleteProductConfirmationAction());
	} catch (error) {
		console.log('error', error);
    	yield put(productsActions.DeleteProductFailureAction(error));
	}
}

export function* watchGetAllProducts() {
	yield takeLatest(productsActions.SGRD_GET_ALL_PRODUCTS_REQUEST, getAllProducts);
}

export function* watchAddProduct() {
	yield takeLatest(productsActions.SGRD_ADD_PRODUCT_REQUEST, addProduct);
}

export function* watchDeleteProduct() {
	yield takeLatest(productsActions.SGRD_DELETE_PRODUCT_REQUEST, deleteProduct);
}
