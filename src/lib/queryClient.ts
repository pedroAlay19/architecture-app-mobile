import { QueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { ApiError } from './api/error';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        Toast.show({ type: 'error', text1: (error as ApiError).message });
      },
    },
    queries: { staleTime: 60_000, retry: 1 }
  },
});