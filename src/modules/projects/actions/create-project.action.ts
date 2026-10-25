import { api } from "@/lib/api/client";
import { CreateProject } from "../interfaces/create-project.interface";
import { CreateProjectForm } from "../schemas/create-project.schema";

export const createProjectAction = async (form: CreateProjectForm): Promise<{ id: string }> => {
  const payload: CreateProject= {
    ...form,
    durationDays: Number(form.durationDays),
    totalBudget: Number(form.totalBudget),
  };

  const { data } = await api.post<{ id: string }>('/projects', payload);
  return data;
};