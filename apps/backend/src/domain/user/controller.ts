import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { IUserController, IUserService } from './interfaces';

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
      const schema = z.object({
        username: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(8).max(255),
      });

      const data = schema.parse(req.body);
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
      const schema = z.object({
        description: z.string().min(3).max(255),
        duration: z.number().min(1),
        date: z.date(),
      });

      const data = await schema.parse(req.body);

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
