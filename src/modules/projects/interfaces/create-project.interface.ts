export interface CreateProject {
  name: string;
  location: string;
  client: string;
  startDate: string; // YYYY-MM-DD
  durationDays: number;
  totalBudget: number;
}