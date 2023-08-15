import { NextFunction, Request, Response } from 'express';
import { userService } from '../service/user';
import { createUserSchema } from '../dto/create-user.dto';

class UserController {
  public async list(req: Request, res: Response, next: NextFunction) {
    return userService.list();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await createUserSchema.validateAsync(req.body);
      return userService.create(data);
    } catch (err) {
      next(err);
    }
  }

  public async createExercise(req: Request, res: Response, next: NextFunction) {
    return userService.createExercise(req.params.id, req.body);
  }
}

export const userController = new UserController();
