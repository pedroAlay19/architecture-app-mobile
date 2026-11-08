import { ApiError } from '@/lib/api/error';
import { useQuery } from '@tanstack/react-query';
import { getProjectsAction } from '../actions/get-projects.action';
import { Project, ProjectStatus } from '../interfaces/project.interface';

export const useProjects = (status?: ProjectStatus) =>
  useQuery<Project[], ApiError>({
    queryKey: ['projects', status],
    queryFn: () => getProjectsAction(status),
});