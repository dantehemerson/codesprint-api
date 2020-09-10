import User from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';

export interface IUsersRepository {
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: CreateUserDto): Promise<User>;
	save(user: User): Promise<User>;
}
