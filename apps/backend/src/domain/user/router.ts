import { Router } from 'express';
import makeUserController from '../factories/controller/UserControllerFactory';

export const router = Router();

const controller = makeUserController();

router.get('/', controller.list);
router.post('/', controller.create);
router.post('/:id/exercises', controller.createExercise);
