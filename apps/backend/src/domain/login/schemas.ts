import { userSchema } from 'domain/user/schemas';

export const loginSchema = userSchema.omit({ email: true });
