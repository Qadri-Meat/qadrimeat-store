import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REFRESH_TOKEN,
  FORGOT_PASSWORD_RESET,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
} from '../actions/authActions';

const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    case REGISTER_SUCCESS:
      return action.payload;
    case REFRESH_TOKEN:
      return {
        ...state,
        tokens: action.payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, success: true };
    case FORGOT_PASSWORD_RESET:
      return { ...state, success: false };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, success: true };
    case RESET_PASSWORD_RESET:
      return { ...state, success: false };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;
