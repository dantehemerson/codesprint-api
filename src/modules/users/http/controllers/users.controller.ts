import { CreateUserService } from '@modules/users/application/services/create-user.service';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { HttpStatus } from '@shared/enums/http-status.enum';
import { Body, HttpCode, JsonController, Post, Patch, Param } from 'routing-controllers';
import { container } from 'tsyringe';
import { UpdateUserDto } from '@modules/users/domain/dto/update-user.dto';
import { UpdateUserService } from '@modules/users/application/services/update-user.service';

@JsonController('/users')
export default class UsersController {
	@HttpCode(HttpStatus.CREATED)
	@Post()
	public async create(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
		const createUser = container.resolve(CreateUserService);

		const user = await createUser.execute(body);

		delete user.password

		return user
	}

	@HttpCode(HttpStatus.OK)
	@Patch('/:id')
	public async update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<Omit<User, 'password'>> {
		const updateUser = container.resolve(UpdateUserService);

		const user = await updateUser.execute(id, body);

		delete user.password

		return user
	}
}
