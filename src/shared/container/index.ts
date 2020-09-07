import { container } from 'tsyringe';
import '@modules/users/infra/providers';

import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import UsersRepository from '@modules/users/infra/persistence/typeorm/repositories/user.repository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
