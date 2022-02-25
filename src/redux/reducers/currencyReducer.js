import { SET_CURRENCY } from '../actions/currencyActions';

const initState = {
  currencySymbol: 'Rs',
  currencyName: 'PKR',
  currencyRate: 1,
};

const currencyReducer = (state = initState, action) => {
  if (action.type === SET_CURRENCY) {
    return {
      ...state,
      currencySymbol: 'Rs',
      currencyRate: 1,
      currencyName: 'PKR',
    };
  }
  return state;
};

export default currencyReducer;
