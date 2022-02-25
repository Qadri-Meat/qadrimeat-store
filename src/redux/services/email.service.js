import api from './api';

class EmailService {
  sendEmail(data) {
    return api.post('send-email/', data);
  }
}

export default new EmailService();
