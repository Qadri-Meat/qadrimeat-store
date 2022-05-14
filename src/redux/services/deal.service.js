import api from './api';

class DealService {
  getAll(page, limit) {
    return api.get(`deals?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`deals/${id}`);
  }
}

export default new DealService();
