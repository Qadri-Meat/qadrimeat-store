import { FETCH_DEALS_SUCCESS, DEAL_RESET } from '../actions/dealActions';

const initState = {
  deals: [],
};

const dealReducer = (state = initState, action) => {
  const { type, payload } = action;
  if (type === FETCH_DEALS_SUCCESS) {
    return {
      ...payload,
      deals: payload.results,
    };
  } else if (action.type === DEAL_RESET) {
    return {};
  }
  return state;
};

export default dealReducer;
