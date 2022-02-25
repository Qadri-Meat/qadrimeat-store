import api from './api';

class ProductService {
  getAll(page, limit) {
    return api.get(`products?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`products/${id}`);
  }

  addReview(id, data) {
    return api.patch(`products/${id}/reviews`, data);
  }
}

export default new ProductService();
