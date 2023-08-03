import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(255).alphanum().required(),
});

export interface CreateUserDTO {
  username: string;
}
