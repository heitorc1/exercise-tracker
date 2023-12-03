import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
});

export const verifySchema = z.object({
  token: z.string(),
});

export const registerSchema = z
  .object({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
