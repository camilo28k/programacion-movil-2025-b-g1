import { User_Account } from '../models/user_account.model';
import httpClient from './httpClient';

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    httpClient.post('/auth/login', credentials),

  register: (data: User_Account) => httpClient.post('/auth/register', data),
  
  verifyToken: (data: { email: string; token: string }) =>
    httpClient.post('/auth/confirm-token', data),
  
};