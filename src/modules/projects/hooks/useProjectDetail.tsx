import { ApiError } from "@/lib/api/error"
import { useQuery } from "@tanstack/react-query"
import { getProjectAction } from "../actions/get-project.action"
import { ProjectDetail } from "../interfaces/project-detail.interface"

export const useProjectDetail = (id: string) => 
    useQuery<ProjectDetail, ApiError>({
        queryKey: ['projects', 'detail', id],
        queryFn: () => getProjectAction(id),
        enabled: !!id
    })