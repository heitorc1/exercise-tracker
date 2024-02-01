import { z } from "zod";

export const listExerciseSchema = z.object({
  page: z.coerce.number().int().positive(),
  pageSize: z.coerce.number().int().positive(),
});

export const findExerciseSchema = z.object({
  id: z.string().uuid(),
});

export const createExerciseSchema = z.object({
  description: z.string().min(3).max(255),
  duration: z.number().min(1),
  date: z.string().datetime(),
});

export const updateExerciseSchema = createExerciseSchema.partial();
