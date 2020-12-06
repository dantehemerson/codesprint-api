import { ICategoriesRepository } from '@modules/categories/domain/interfaces/category-repository.interface';
import { CategoriesRepository } from '@modules/categories/infra/repositories/category.repository';
import { IChallengesRepository } from '@modules/challenges/domain/interfaces/challenges-repository.interface';
import { ChallengesRepository } from '@modules/challenges/infra/persistence/typeorm/repositories/challenges.repository';
import { IAuthProvider } from '@modules/users/domain/interfaces/auth-provider.interface';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import UsersRepository from '@modules/users/infra/persistence/typeorm/repositories/user.repository';
import '@modules/users/infra/providers';
import '@modules/challenges/infra/providers';
import { AuthProvider } from '@modules/users/infra/providers/auth.provider';
import { container } from 'tsyringe';
import { ILoggerProvider } from '@shared/domain/interfaces/logger.interface';
import { Logger } from '@shared/infra/providers/logger.provider';

container.registerSingleton<IAuthProvider>(AuthProvider.name, AuthProvider);
container.registerSingleton<ILoggerProvider>(Logger.name, Logger);

container.registerSingleton<IUsersRepository>(
  UsersRepository.name,
  UsersRepository,
);

container.registerSingleton<IChallengesRepository>(
  ChallengesRepository.name,
  ChallengesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  CategoriesRepository.name,
  CategoriesRepository,
);
