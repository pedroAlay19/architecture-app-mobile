import { ApiError } from '@/lib/api/error';
import { useMutation } from '@tanstack/react-query';
import { loginAction, LoginPayload } from '../actions/login.action';
import { LoginResponse } from '../interfaces/login.response';
import { useSessionStore } from '../store/sesion.store';

export const useLogin = () => {
  const setToken = useSessionStore((s) => s.setToken);

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: loginAction,
    onSuccess: (data) => setToken(data.token),
  });
};