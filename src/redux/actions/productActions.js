import productService from '../services/productService';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const PRODUCT_RESET = 'PRODUCT_RESET';

export const fetchProducts = (page, limit, addToast) => async (dispatch) => {
  try {
    const res = await productService.getAll(page, limit);
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
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

export const addReview = (id, data, addToast) => async (dispatch) => {
  try {
    const res = await productService.addReview(id, data);
    dispatch({
      type: ADD_REVIEW_SUCCESS,
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
