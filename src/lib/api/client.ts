import { useSessionStore } from '@/modules/auth/store/sesion.store';
import axios from 'axios';
import { toApiError } from './error';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const apiError = toApiError(error);

    // token vencido o inválido en una ruta protegida
    if (apiError.status === 401 && useSessionStore.getState().token) {
      useSessionStore.getState().logout();
    }

    return Promise.reject(apiError);
  },
);