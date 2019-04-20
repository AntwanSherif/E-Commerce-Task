import { fork, all } from 'redux-saga/effects';
import * as AuthorizationSagas from './authorizationSaga';
import * as ProductsSagas from './productsSaga';
import * as OrdersSagas from './ordersSaga';

export default function* rootSaga() {
	yield all ([
        //Authorization Sagas
        fork(AuthorizationSagas.watchSignup),
        fork(AuthorizationSagas.watchLogin),
        fork(AuthorizationSagas.watchLogout),

        //Products Sagas
        fork(ProductsSagas.watchGetAllProducts),
        fork(ProductsSagas.watchAddProduct),
        fork(ProductsSagas.watchEditProduct),
        fork(ProductsSagas.watchDeleteProduct),
        
        //Orders Sagas
        fork(OrdersSagas.watchPlaceOrder),
        fork(OrdersSagas.watchFetchUsersOrders)
    ]);
}