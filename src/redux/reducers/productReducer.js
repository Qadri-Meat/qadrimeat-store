import {
  FETCH_PRODUCTS_SUCCESS,
  ADD_REVIEW_SUCCESS,
  PRODUCT_RESET,
} from '../actions/productActions';

const initState = {
  products: [],
};

const productReducer = (state = initState, action) => {
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload.results,
      limit: action.payload.limit,
      page: action.payload.page,
      totalPages: action.payload.totalPages,
    };
  } else if (action.type === ADD_REVIEW_SUCCESS) {
    return {
      ...state,
      success: true,
    };
  } else if (action.type === PRODUCT_RESET) {
    return {
      ...state,
      success: false,
    };
  }

  return state;
};

export default productReducer;
