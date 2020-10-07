import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { CategoriesRepository } from '@modules/categories/infra/repositories/category.repository';
import { AuthProvider } from '@modules/users/infra/providers/auth.provider';
import { IAuthProvider } from '@modules/users/domain/interfaces/auth-provider.interface';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import UsersRepository from '@modules/users/infra/persistence/typeorm/repositories/user.repository';
import '@modules/users/infra/providers';
import { container } from 'tsyringe';

container.registerSingleton<IAuthProvider>(AuthProvider.name, AuthProvider);

container.registerSingleton<IUsersRepository>(
  UsersRepository.name,
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  CategoriesRepository.name,
  CategoriesRepository,
);
