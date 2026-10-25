import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().trim().min(2, 'At least two characters'),
  location: z.string().trim().min(2, 'At least two characters'),
  client: z.string().trim().min(2, 'At least two characters'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Selecciona una fecha'),
  durationDays: z
    .string()
    .regex(/^\d+$/, 'Only whole numbers')
    .refine((v) => Number(v) >= 1, 'At least one day'),
  totalBudget: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount (max. 2 decimal places)'),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;