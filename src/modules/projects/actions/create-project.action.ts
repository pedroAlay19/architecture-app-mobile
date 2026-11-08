import { api } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";
import { CreateProject } from "../interfaces/create-project.interface";
import { CreateProjectForm } from "../schemas/create-project.schema";

export const createProjectAction = async (form: CreateProjectForm): Promise<ApiResponse<{ id: string }>> => {
  const payload: CreateProject= {
    ...form,
    durationDays: Number(form.durationDays),
    totalBudget: Number(form.totalBudget),
  };

  const { data: res } = await api.post<ApiResponse<{ id: string }>>('/projects', payload);
  return res;
};