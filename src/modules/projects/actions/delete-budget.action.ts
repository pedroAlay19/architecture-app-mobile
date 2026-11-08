import { api } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";

export const deleteBudgetAction = async (projectId: string): Promise<ApiResponse<null>> => {
    const { data: res } = await api.delete<ApiResponse<null>>(`/projects/${projectId}/budget`);
    return res;
}