import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/create-user.service';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;
		console.log('Dante: UsersController -> password', password);

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		delete user.password;

		return res.json(user);
	}
}
