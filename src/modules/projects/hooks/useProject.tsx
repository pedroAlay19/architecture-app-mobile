import { ApiError } from '@/lib/api/error';
import { useQuery } from '@tanstack/react-query';
import { getProjectsAction } from '../actions/get-projects.action';
import { ProjectStatus } from '../interfaces/project.interface';
import { ProjectsResponse } from '../interfaces/projects.response';

export const useProjects = (status?: ProjectStatus) =>
  useQuery<ProjectsResponse, ApiError>({
    queryKey: ['projects', status],
    queryFn: () => getProjectsAction(status),
});