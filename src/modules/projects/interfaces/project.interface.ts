export type ProjectStatus = 'in_progress' | 'completed';

export interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  startDate: string;
  durationDays: number;
  estimatedEndDate: string;
  totalBudget: number;
  status: ProjectStatus;
  createdAt: string;
}