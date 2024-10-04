// src/utils/axiosConfig.js
import axios from 'axios';

const AuthNest = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend's base URL
});

// Add a request interceptor to include the JWT token
AuthNest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AuthNest;
