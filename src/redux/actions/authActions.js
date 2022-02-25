import AuthService from '../services/auth.service';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_RESET = 'FORGOT_PASSWORD_RESET';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_RESET = 'RESET_PASSWORD_RESET';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const login = (creadentials, addToast) => (dispatch) => {
  return AuthService.login(creadentials).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('authData', JSON.stringify(data));
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (addToast) {
        addToast(message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  );
};

export const register = (creadentials, addToast) => (dispatch) => {
  return AuthService.register(creadentials).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem('authData', JSON.stringify(data));
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (addToast) {
        addToast(message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  );
};

export const forgotPassword = (email, addToast) => (dispatch) => {
  return AuthService.forgotPassword(email).then(
    (data) => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (addToast) {
        addToast(message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  );
};

export const resetPassword = (password, token, addToast) => (dispatch) => {
  return AuthService.resetPassword(password, token).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (addToast) {
        addToast(message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const refreshToken = (tokens) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: tokens,
  });
};
