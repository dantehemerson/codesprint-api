import { CreateUserService } from '@modules/users/application/services/create-user.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		// delete user.password;

		return res.json(user);
	}
}
