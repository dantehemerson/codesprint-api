import { container } from 'tsyringe';
import '@modules/users/providers/';

import { IUsersRepository } from '@modules/users/repositories/user-repository.interface';
import UsersRepository from '@modules/users/infra/typeorm/repositories/user.repository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
