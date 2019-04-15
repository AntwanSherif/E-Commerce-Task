// import { configureStore } from 'redux-starter-kit';
// import sliceReducers from './reducers';


// const store = configureStore({
//     reducer: {
//         ...sliceReducers
//     }
//   })

// export default store;


import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers';
import initialState from './initialState';
import sagas from './sagas';

// Create a browser history
export const history = createBrowserHistory();


// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

// Add redux-logger (for client-side only)
if(process.env.NODE_ENV === 'development') {
	if (typeof window !== 'undefined' && window.document) {
		middleware.push(createLogger({collapsed: true}));
	}
}


// Configure Redux Store
const store = createStore(
	createRootReducer(history),
	initialState,
	composeWithDevTools(
		applyMiddleware(...middleware),
	)
);

// Hot reloading
if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('./reducers', () => {
	  store.replaceReducer(createRootReducer(history));
	});
}

// Configure redux-saga
store.runSaga = sagaMiddleware.run;
store.runSaga(sagas);
store.close = () => store.dispatch(END);

export default store;