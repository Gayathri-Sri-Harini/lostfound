import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosAuth.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAuth;