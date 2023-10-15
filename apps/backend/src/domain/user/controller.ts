import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { IUserController, IUserService } from './interfaces';
import { exerciseSchema, userSchema } from './schemas';

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.userService.list();
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = userSchema.parse(req.body);
      const response = await this.userService.create(data);

      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  };

  public createExercise = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await exerciseSchema.parse(req.body);

      const response = await this.userService.createExercise(
        req.params.id,
        data,
      );
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  };
}
