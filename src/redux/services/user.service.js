import api from './api';

class UserService {
  get(id) {
    return api.get(`users/${id}`);
  }
  update(data) {
    return api.patch(`/users`, data);
  }
}

export default new UserService();
