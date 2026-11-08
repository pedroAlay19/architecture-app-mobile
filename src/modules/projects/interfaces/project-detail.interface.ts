import { Project } from './project.interface';

export interface BudgetItem {
  id: string;
  code: string | null;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  subtotal: number;
  items: BudgetItem[];
}

export interface ProjectBudget {
  hasBudget: boolean;
  total: number;
  categories: BudgetCategory[];
}

export interface ProjectDetail extends Project {
  budget: ProjectBudget;
}