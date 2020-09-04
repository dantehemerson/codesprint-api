import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import AppError from '@shared/errors/app.error';
import { inject, injectable } from 'tsyringe';
import { HashProvider } from '../../domain/interfaces/hash-provider.interface';
import User from '../../infra/persistence/typeorm/entities/user';

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

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
