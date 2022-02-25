import {
  CREATE_ORDER_SUCCESS,
  ORDER_RESET,
  ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
} from '../actions/orderActions';

const initState = {};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case FETCH_ORDER_SUCCESS:
      return { ...state, ...action.payload };
    case ORDER_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
