import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const exerciseSchema = z.object({
  description: z.string().min(3).max(255),
  duration: z.number().min(1),
  date: z.coerce.date(),
});
