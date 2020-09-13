import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { ConflictError } from '@shared/errors/conflict.error';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../../domain/interfaces/hash-provider.interface';
import { User } from '../../infra/persistence/typeorm/entities/user.entity';
import { UpdateUserDto } from '@modules/users/domain/dto/update-user.dto';
import { NotFoundError } from 'routing-controllers';

@injectable()
export class UpdateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	async execute(id: string, { name, email, password }: UpdateUserDto): Promise<User> {
		const user = await this.usersRepository.findById(id);
		if(!user) {
			throw new NotFoundError('User not found')
		}

		if(email) {
			await this.checkUserExistsByEmail(email)
		}

		Object.assign(user, {
			name,
			email,
			password
		})

		return this.usersRepository.save(user)
	}

	/**
	 * Throws conflict error if an user with the same email aready exists
	 * @param email
	 */
	private async checkUserExistsByEmail(email: string) {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			throw new ConflictError(
				`An user with the same email ${email} already exists.`,
			);
		}
	}
}
