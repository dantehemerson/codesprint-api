import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/users', usersRouter);
