import { userSchema } from '../user/schemas';

export const loginSchema = userSchema.omit({ email: true });
