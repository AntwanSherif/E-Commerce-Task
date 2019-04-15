import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router';
import store, { history } from './redux/configureStore';
import App from './App';
import Routes from './navigation/routes';
import * as serviceWorker from './serviceWorker';
import { setAuthToken } from './utils/setAuthToken';

// styles
import './index.css';
import 'semantic-ui-css/semantic.min.css';


/* Enable hot reloading */
if (module.hot) {
    module.hot.accept();
}

// Configure Axios to add Authorization header to all api requests
const acceessToken = localStorage.getItem('accessToken');
setAuthToken(acceessToken);


/* Render App */
ReactDOM.render(
    <Provider store={store}>
		<ConnectedRouter history={history}>
			<Route>
				<App>
					<Routes />
				</App>
			</Route>
		</ConnectedRouter>
	</Provider>
    , document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
