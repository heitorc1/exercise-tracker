import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const updateUserSchema = createUserSchema.partial();

export const jwtUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(255),
  email: z.string().email(),
});
