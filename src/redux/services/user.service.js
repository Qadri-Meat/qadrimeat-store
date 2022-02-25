import api from './api';

class UserService {
  get(id) {
    return api.get(`/users/${id}`);
  }
  getProfile(id) {
    return api.get(`/users/${id}`);
  }

  getPublicProfile(id) {
    return api.get(`/users/public/${id}`);
  }
  update(data) {
    return api.patch(`/users`, data);
  }
}

export default new UserService();
