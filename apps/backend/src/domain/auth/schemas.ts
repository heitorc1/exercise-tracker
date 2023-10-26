import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
});

export const verifySchema = z.object({
  token: z.string(),
});