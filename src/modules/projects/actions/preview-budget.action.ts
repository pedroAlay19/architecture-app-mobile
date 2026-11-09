import { api } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";
import type { DocumentPickerAsset } from 'expo-document-picker';
import { XLSX_MIME } from "../constants/budget.constants";
import { BudgetPreview } from "../interfaces/budget-preview.interface";

export const previewBudgetAction = async (
    projectId: string,
    file: DocumentPickerAsset
): Promise<BudgetPreview> => {
    const formData = new FormData();

    formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType ?? XLSX_MIME
    } as unknown as Blob);

    const { data: res } = await api.post<ApiResponse<BudgetPreview>>(
        `/projects/${projectId}/budget/preview`,
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
    );

    return res.data;
}