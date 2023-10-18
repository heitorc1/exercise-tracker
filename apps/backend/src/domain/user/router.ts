import { NextFunction, Request, Response, Router } from 'express';
import {
  createExerciseSchema,
  createUserSchema,
  updateUserSchema,
} from './schemas';
import makeUserService from 'domain/factories/service/UserServiceFactory';
import { authenticate } from 'infra/middlewares/authenticate';
import { UserNotFoundError } from 'infra/exception/UserNotFoundError';

const router = Router();

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
    const data = createUserSchema.parse(req.body);
    const response = await service.create(data);

    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

router.patch(
  '/',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = updateUserSchema.parse(req.body);

      if (!req.user) {
        throw new UserNotFoundError();
      }

      const response = await service.update(req.user.id, data);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/exercises',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createExerciseSchema.parse(req.body);

      if (!req.user) {
        throw new UserNotFoundError();
      }

      const response = await service.createExercise(req.user.id, data);
      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
);

export { router as userRouter };
