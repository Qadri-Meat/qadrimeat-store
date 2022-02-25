class TokenService {
  getLocalRefreshToken() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    return authData?.tokens.refresh.token;
  }

  getLocalAccessToken() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    return authData?.tokens.access.token;
  }

  updateLocalTokens(tokens) {
    let authData = JSON.parse(localStorage.getItem('authData'));
    authData.tokens = tokens;
    localStorage.setItem('authData', JSON.stringify(authData));
  }

  getAuthData() {
    return JSON.parse(localStorage.getItem('authData'));
  }

  setAuthData(authData) {
    localStorage.setItem('authData', JSON.stringify(authData));
  }

  removeAuthData() {
    localStorage.removeItem('authData');
  }
}

export default new TokenService();
