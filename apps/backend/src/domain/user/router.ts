import { NextFunction, Request, Response, Router } from 'express';
import makeUserService from '../factories/service/UserServiceFactory';
import { exerciseSchema, userSchema } from './schemas';
import { authenticate } from '../../infra/middlewares/authenticate';

export const router = Router();

const service = makeUserService();

router.get(
  '/',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await service.list();
      return res.json(response);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = userSchema.parse(req.body);
    const response = await service.create(data);

    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:id/exercises',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await exerciseSchema.parse(req.body);

      const response = await service.createExercise(req.params.id, data);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
);
