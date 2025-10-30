// src/api/httpClient.ts
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://localhost:3000/api', // URL del backend NestJS
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default httpClient;