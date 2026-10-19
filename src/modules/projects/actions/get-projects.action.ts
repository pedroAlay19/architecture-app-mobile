import { api } from '@/lib/api/client';
import { ProjectStatus } from '../interfaces/project.interface';
import { ProjectsResponse } from '../interfaces/projects.response';

export const getProjectsAction = async (status?: ProjectStatus): Promise<ProjectsResponse> => {
  const { data } = await api.get<ProjectsResponse>('/projects', { params: { status } });
  console.log(data);
  return data;
};