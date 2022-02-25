import api from './api';

class FollowerService {
  create(data) {
    return api.post(`followers/`, data);
  }
}

export default new FollowerService();
