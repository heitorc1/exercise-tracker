import { Router } from 'express';
import { userController } from './controller/user';

export const router = Router();

router.get('/', userController.list);
router.post('/', userController.create);
router.post('/:id/exercises', userController.createExercise);
