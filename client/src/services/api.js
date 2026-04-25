import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const API_URL = isDevelopment ? (import.meta.env.VITE_API_URL || '/api') : '/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token if it exists
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
