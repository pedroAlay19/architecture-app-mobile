import { BudgetPreview } from '../interfaces/budget-preview.interface';
import { CreateBudgetPayload } from '../interfaces/create-budget.interface';

export const toCreateBudgetPayload = (preview: BudgetPreview): CreateBudgetPayload => ({
  categories: preview.categories.map((c) => ({
    name: c.name,
    items: c.items.map(({ code, description, unit, quantity, unitPrice }) => ({
      code: code ?? undefined,
      description,
      unit,
      quantity,
      unitPrice,
    })),
  })),
});