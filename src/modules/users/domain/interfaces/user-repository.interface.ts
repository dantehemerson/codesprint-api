import User from '@modules/users/infra/persistence/typeorm/entities/user';
import ICreateUserDTO from '@modules/users/domain/dto/create-user.dto';

export interface IUsersRepository {
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
}
