import axiosInstance from './api';
import TokenService from './token.service';
import { refreshToken } from '../actions/authActions';

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
        // config.headers['x-access-token'] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        originalConfig.url !== '/auth/login' &&
        originalConfig.url !== '/auth/refresh-tokens' &&
        err.response
      ) {
        const token = TokenService.getLocalRefreshToken();
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry && token) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post('auth/refresh-tokens', {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            dispatch(refreshToken(rs.data));
            TokenService.updateLocalTokens(rs.data);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      } else if (originalConfig.url === '/auth/refresh-tokens') {
        TokenService.removeAuthData();
        window.open('/login-register');
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
