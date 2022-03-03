import api from './api';

class OrderService {
  getAll(phone) {
    return api.get(`orders?phone=${phone}`);
  }
  get(id) {
    return api.get(`orders/${id}`);
  }
  create(data) {
    return api.post(`orders`, data);
  }
}

export default new OrderService();
