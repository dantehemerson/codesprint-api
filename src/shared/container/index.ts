import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { CategoriesRepository } from '@modules/categories/infra/repositories/category.repository';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import UsersRepository from '@modules/users/infra/persistence/typeorm/repositories/user.repository';
import '@modules/users/infra/providers';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository,
);
