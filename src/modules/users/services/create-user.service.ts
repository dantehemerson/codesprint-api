import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/app.error';

import { IUsersRepository } from '@modules/users/repositories/user-repository.interface';
import User from '../infra/typeorm/entities/user';

import { HashProvider } from '../providers/hash-provider/models/hash-provider.interface';

interface IRequestDTO {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: HashProvider,
	) {}

	public async execute({ name, email, password }: IRequestDTO): Promise<User> {
		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError(
				`An user with the same email ${email} already exists.`,
			);
		}

		const hashedPassword = await this.hashProvider.generateHash(password);
		console.log('Dante: CreateUserService -> hashedPassword', hashedPassword);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
