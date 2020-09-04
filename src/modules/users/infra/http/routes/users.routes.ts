import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/users.controller';

const usersController = new UsersController();

export const usersRouter = Router();
usersRouter.post('/', usersController.create);
/** test */
usersRouter.get('/', (req, res) => {
	res.json([]);
});
