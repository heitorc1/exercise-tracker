import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const updateUserSchema = createUserSchema.partial();

export const createExerciseSchema = z.object({
  description: z.string().min(3).max(255),
  duration: z.number().min(1),
  date: z.coerce.date(),
});
