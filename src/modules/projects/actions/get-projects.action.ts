import { api } from '@/lib/api/client';
import { ApiResponse } from '@/lib/api/interfaces/api-response.interface';
import { Project, ProjectStatus } from '../interfaces/project.interface';

export const getProjectsAction = async (status?: ProjectStatus): Promise<Project[]> => {
  const { data: res } = await api.get<ApiResponse<Project[]>>('/projects', { params: { status } });
  console.log(res.data)
  return res.data;
};