import { ApiError } from '@/lib/api/error';
import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { createProjectAction } from '../actions/create-project.action';
import { CreateProjectForm } from '../schemas/create-project.schema';

export const useCreateProject = () => {

  return useMutation<{ id: string }, ApiError, CreateProjectForm>({
    mutationFn: createProjectAction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};