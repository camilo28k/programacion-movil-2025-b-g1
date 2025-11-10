import { User_Account } from '../models/user_account.model';
import httpClient from './httpClient';

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    httpClient.post('/auth/login', credentials),

  register: (data: User_Account) => httpClient.post('/auth/register', data),
  
  verifyToken: (data: { email: string; token: string }) =>
    httpClient.post('/auth/confirm-token', data),

  // ✅ Método para reenviar token
  resendToken: (email: string) =>
    httpClient.post('/auth/resend-token', { email }),
};

export const categoryService = {
  getAll: () => httpClient.get('/category'),
};

export const companyService = {
  create: (data: any) => httpClient.post("/company", data),
  getAll: () => httpClient.get("/company"),
};