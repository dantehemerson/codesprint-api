import User from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { ICreateUserDto } from '@modules/users/domain/dto/create-user.dto';

export interface IUsersRepository {
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: ICreateUserDto): Promise<User>;
	save(user: User): Promise<User>;
}
