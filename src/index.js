import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import { Provider } from 'react-redux';
import { fetchProducts } from './redux/actions/productActions';
import rootReducer from './redux/reducers/rootReducer';
import App from './App';
import './assets/scss/style.scss';
import * as serviceWorker from './serviceWorker';

import { composeWithDevTools } from 'redux-devtools-extension';
import setupInterceptors from './redux/services/setupInterceptors';
import { setCurrency } from './redux/actions/currencyActions';
import { fetchDeals } from './redux/actions/dealActions';

const middlewares = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(thunk, save()));

const authDataFromStorage = localStorage.getItem('authData')
  ? JSON.parse(localStorage.getItem('authData'))
  : {};

const initialState = {
  ...load(),
  authData: authDataFromStorage,
};
const store = createStore(rootReducer, initialState, devTools);

setupInterceptors(store);
// fetch products from json file
store.dispatch(setCurrency('PKR'));
store.dispatch(fetchProducts(1, 100));
store.dispatch(fetchDeals(1, 100));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
