import {
  CREATE_ORDER_SUCCESS,
  ORDER_RESET,
  ORDER_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDER_SUCCESS,
} from '../actions/orderActions';

const initState = {};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { loading: true };
    case GET_ORDER_SUCCESS:
      console.log('totalPrice', action.payload.totalPrice);
      return { loading: false, selectedOrder: action.payload };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case GET_ORDERS_SUCCESS:
      return { loading: false, ...action.payload };
    case ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export default orderReducer;
