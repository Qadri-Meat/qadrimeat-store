import OrderService from '../services/order.service';
import { DELETE_ALL_FROM_CART } from '../actions/cartActions';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const ORDER_RESET = 'ORDER_RESET';
export const ORDER_REQUEST = 'ORDER_REQUEST';

export const fetchOrder = (id, addToast) => async (dispatch) => {
  try {
    const res = await OrderService.get(id);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (addToast) {
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }
};

export const fetchOrders = (email, page, limit, addToast) => async (
  dispatch
) => {
  try {
    const res = await OrderService.getAll(email, page, limit);
    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (addToast) {
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }
};

export const createOrder = (data, addToast) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_REQUEST,
    });
    const res = await OrderService.create(data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: res.data,
    });
    dispatch({ type: DELETE_ALL_FROM_CART });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (addToast) {
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }
};
