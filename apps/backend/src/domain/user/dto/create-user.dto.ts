import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(255).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).max(255).required(),
});

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}
