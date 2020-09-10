import { CreateUserService } from '@modules/users/application/services/create-user.service';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import User from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

@JsonController('/users')
export default class UsersController {
	@Post()
	public async create(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
		const { name, email, password } = body;

		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		delete user.password

		return user
	}
}
