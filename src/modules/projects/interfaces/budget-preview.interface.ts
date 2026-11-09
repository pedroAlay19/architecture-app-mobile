export interface PreviewItem {
  code: string | null;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PreviewCategory {
  name: string;
  subtotal: number;
  items: PreviewItem[];
}

export interface BudgetPreview {
  categories: PreviewCategory[];
  summary: { categories: number; items: number; total: number };
  warnings: string[];
}