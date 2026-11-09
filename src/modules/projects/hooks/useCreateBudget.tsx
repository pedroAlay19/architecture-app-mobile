import { ApiError } from '@/lib/api/error';
import { ApiResponse } from '@/lib/api/interfaces/api-response.interface';
import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { createBudgetAction } from '../actions/create-budget.action';
import { BudgetPreview } from '../interfaces/budget-preview.interface';
import { toCreateBudgetPayload } from '../utils/budget.mapper';

export const useCreateBudget = (projectId: string) =>
  useMutation<ApiResponse<null>, ApiError, BudgetPreview>({
    mutationFn: (preview) => createBudgetAction(projectId, toCreateBudgetPayload(preview)),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      Toast.show({ type: 'success', text1: res.message });
    },
  });