// src/api/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // 👈 clave correcta
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
