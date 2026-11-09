import { ApiError } from '@/lib/api/error';
import { useMutation } from '@tanstack/react-query';
import type { DocumentPickerAsset } from 'expo-document-picker';
import { previewBudgetAction } from '../actions/preview-budget.action';
import { BudgetPreview } from '../interfaces/budget-preview.interface';

export const usePreviewBudget = (projectId: string) =>
  useMutation<BudgetPreview, ApiError, DocumentPickerAsset>({
    mutationFn: (file) => previewBudgetAction(projectId, file),
  });