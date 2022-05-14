import currencyReducer from './currencyReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import compareReducer from './compareReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';
import dealReducer from './dealReducer';
import cart1Reducer from './cart1Reducer';
import { combineReducers } from 'redux';
import { createMultilanguageReducer } from 'redux-multilanguage';

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  orderData: orderReducer,
  authData: authReducer,
  userData: userReducer,
  dealData: dealReducer,
  cart1Data: cart1Reducer,
});

export default rootReducer;
