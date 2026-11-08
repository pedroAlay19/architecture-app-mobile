import { api } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";
import { ProjectDetail } from "../interfaces/project-detail.interface";

export const getProjectAction = async(id: string): Promise<ProjectDetail> => {
    const { data: res } = await api.get<ApiResponse<ProjectDetail>>(`/projects/${id}`);
    return res.data;
}