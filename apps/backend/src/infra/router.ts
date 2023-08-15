import { Router } from 'express';
import { router as userRouter } from '../domain/user/router';

export const router = Router();

router.use('/user', userRouter);
