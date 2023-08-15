import * as Joi from 'joi';

export const createExerciseSchema = Joi.object({
  description: Joi.string().min(3).max(255).required(),
  duration: Joi.number().min(1).required(),
  date: Joi.date().iso(),
  // TODO erro na validação
});

export interface CreateExerciseDTO {
  description: string;
  duration: number;
  date: Date;
}
