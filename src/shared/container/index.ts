import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { CategoriesRepository } from '@modules/categories/infra/repositories/category.repository';
import { AuthService } from '@modules/users/application/services/auth.service';
import { IAuthService } from '@modules/users/domain/interfaces/auth-service.interface';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import UsersRepository from '@modules/users/infra/persistence/typeorm/repositories/user.repository';
import '@modules/users/infra/providers';
import { container } from 'tsyringe';

container.registerSingleton<IAuthService>(AuthService.name, AuthService);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository,
);
