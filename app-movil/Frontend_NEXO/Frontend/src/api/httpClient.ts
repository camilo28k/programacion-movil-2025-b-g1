// src/api/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://pricey-grizzly-bethany.ngrok-free.dev/api', // nueva URL del túnel
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;


