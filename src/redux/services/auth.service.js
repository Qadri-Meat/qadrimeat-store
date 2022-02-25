import api from './api';
import TokenService from './token.service';

class AuthService {
  login(creadentials) {
    return api.post('auth/login', creadentials).then((response) => {
      if (response.data) {
        TokenService.setAuthData(response.data);
      }
      return response.data;
    });
  }
  register(creadentials) {
    return api.post('auth/register', creadentials).then((response) => {
      if (response.data) {
        TokenService.setAuthData(response.data);
      }
      return response.data;
    });
  }

  forgotPassword(email) {
    return api.post('auth/forgot-password', { email });
  }

  resetPassword(password, token) {
    return api.post(`auth/reset-password?token=${token}`, { password });
  }
  logout() {
    TokenService.removeAuthData();
  }
}

export default new AuthService();
