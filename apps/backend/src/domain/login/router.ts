import { NextFunction, Request, Response, Router } from 'express';
import { loginSchema } from './schemas';
import makeLoginService from 'domain/factories/service/LoginServiceFactory';

const router = Router();

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

export { router as loginRouter };
