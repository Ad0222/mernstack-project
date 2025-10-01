import axios from 'axios';
import { getToken } from './auth';

// api ko directly declare karo, import ki zarurat nahi
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
