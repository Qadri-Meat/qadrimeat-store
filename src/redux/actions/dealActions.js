import dealService from '../services/deal.service';

export const FETCH_DEALS_SUCCESS = 'FETCH_DEALS_SUCCESS';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const DEAL_RESET = 'DEAL_RESET';

export const fetchDeals = (page, limit, addToast) => async (dispatch) => {
  try {
    const res = await dealService.getAll(page, limit);
    dispatch({
      type: FETCH_DEALS_SUCCESS,
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
