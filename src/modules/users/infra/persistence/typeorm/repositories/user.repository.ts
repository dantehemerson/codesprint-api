import { getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import User from '@modules/users/infra/persistence/typeorm/entities/user.entity';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	async findById(id: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne(id);

		return user;
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.ormRepository.findOne({ where: { email } });

		return user;
	}

	async create(userData: CreateUserDto): Promise<User> {
		const user = await this.ormRepository.create(userData);
		return this.save(user);
	}

	async save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UsersRepository;
