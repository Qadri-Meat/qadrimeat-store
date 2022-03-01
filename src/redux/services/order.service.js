import api from './api';

class OrderService {
  getAll(email) {
    return api.get(`orders?email=${email}`);
  }
  get(id) {
    return api.get(`orders/${id}`);
  }
  create(data) {
    console.log(data);
    return api.post(`orders`, data);
  }
}

export default new OrderService();
