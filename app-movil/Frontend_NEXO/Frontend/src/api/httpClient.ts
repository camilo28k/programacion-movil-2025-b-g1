// src/api/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://localhost:3000/api', // URL del backend NestJS
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;