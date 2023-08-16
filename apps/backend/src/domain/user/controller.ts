import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { userService } from './service';

class UserController {
  public async list(req: Request, res: Response, next: NextFunction) {
    return userService.list();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        username: Joi.string().min(3).max(255).alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).max(255).required(),
      });

      const data = await schema.validateAsync(req.body);

      return userService.create(data);
    } catch (err) {
      next(err);
    }
  }

  public async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        description: Joi.string().min(3).max(255).required(),
        duration: Joi.number().min(1).required(),
        date: Joi.date().iso(),
      });

      const data = await schema.validateAsync(req.body);

      return userService.createExercise(req.params.id, data);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
