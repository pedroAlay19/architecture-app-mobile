export interface CreateBudgetItem {
  code?: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateBudgetCategory {
  name: string;
  items: CreateBudgetItem[];
}

export interface CreateBudgetPayload {
  categories: CreateBudgetCategory[];
}