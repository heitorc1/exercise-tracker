import { NextFunction, Request, Response, Router } from 'express';
import makeLoginController from '../factories/controller/LoginControllerFactory';
import { loginSchema } from './schemas';
import makeLoginService from '../factories/service/LoginServiceFactory';

export const router = Router();

const service = makeLoginService();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);

    const response = await service.login(data);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
