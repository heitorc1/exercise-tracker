import { Router } from 'express';
import { loginRouter } from 'domain/login/router';
import { userRouter } from 'domain/user/router';

export const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
