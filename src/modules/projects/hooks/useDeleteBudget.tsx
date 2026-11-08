import { ApiError } from "@/lib/api/error";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { deleteBudgetAction } from "../actions/delete-budget.action";

export const useDeleteBudget = (projectId: string) =>
    useMutation<ApiResponse<null>, ApiError, void>({
        mutationFn: () => deleteBudgetAction(projectId),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['projects']});
            Toast.show({type: 'success', text1: res.message})
        }
    })