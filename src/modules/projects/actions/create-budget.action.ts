import { api } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";
import { CreateBudgetPayload } from "../interfaces/create-budget.interface";

export const createBudgetAction = async(
    projectId: string,
    payload: CreateBudgetPayload
): Promise<ApiResponse<null>> => {

    const { data: res } = await api.post<ApiResponse<null>>(
        `/projects/${projectId}/budget`,
        payload
    );
    return res;
} 