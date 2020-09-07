import { container } from 'tsyringe';
import '@modules/users/infra/providers';

import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import UsersRepository from '@modules/users/infra/persistence/typeorm/repositories/user.repository';

import ICategoriesRepository from '@modules/categories/domain/interfaces/category-repository.interface';
import CategoriesRepository from '@modules/categories/infra/repositories/category.repository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository,
);
