import { usersRouter } from '@modules/users/http/routes/users.routes';
import { categoriesRouter } from '@modules/categories/http/routes/categories.routes';
import { Router } from 'express';

export const routes = Router();
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
