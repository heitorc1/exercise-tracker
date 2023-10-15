import { Router } from 'express';
import { router as userRouter } from 'domain/user/router';
import { router as loginRouter } from 'domain/login/router';

export const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
