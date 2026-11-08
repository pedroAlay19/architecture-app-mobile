import { ApiError } from '@/lib/api/error';
import { ApiResponse } from '@/lib/api/interfaces/api-response.interface';
import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { createProjectAction } from '../actions/create-project.action';
import { CreateProjectForm } from '../schemas/create-project.schema';

export const useCreateProject = () => {
  return useMutation<ApiResponse<{ id: string }>, ApiError, CreateProjectForm>({
    mutationFn: createProjectAction,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      Toast.show({type: 'success', text1: res.message})
    },
  });
};