import UserService from '../services/user.service';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const USER_RESET = 'USER_RESET';

export const getProfile = (id, addToast) => async (dispatch) => {
  try {
    const res = await UserService.getProfile(id);
    dispatch({
      type: GET_PROFILE_SUCCESS,
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

export const getPublicProfile = (id, addToast) => async (dispatch) => {
  try {
    const res = await UserService.getPublicProfile(id);
    dispatch({
      type: GET_PROFILE_SUCCESS,
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

export const getUser = (id, addToast) => async (dispatch) => {
  try {
    const res = await UserService.get(id);
    dispatch({
      type: GET_USER_SUCCESS,
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

export const updateUser = (data, addToast) => async (dispatch) => {
  try {
    const res = await UserService.update(data);
    dispatch({
      type: UPDATE_USER_SUCCESS,
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
