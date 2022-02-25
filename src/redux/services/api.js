import axios from 'axios';

// const baseURL = "https://admin.mywiz.com/api/v1";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
