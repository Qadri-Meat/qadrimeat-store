import {
  UPDATE_USER_SUCCESS,
  USER_RESET,
  GET_USER_SUCCESS,
  GET_PROFILE_SUCCESS,
} from '../actions/userActions';

const initState = { user: {}, address: {} };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
      return { success: true };
    case GET_USER_SUCCESS:
      return { user: action.payload };
    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload };
    case USER_RESET:
      return initState;
    default:
      return state;
  }
};

export default userReducer;
