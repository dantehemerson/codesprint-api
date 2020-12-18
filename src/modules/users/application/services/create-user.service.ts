import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { ConflictError } from '@shared/errors/conflict.error';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../../domain/interfaces/hash-provider.interface';
import { User } from '../../infra/persistence/typeorm/entities/user.entity';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    username,
  }: CreateUserDto): Promise<User> {
    await this.ensureEmailUniqueness(email);
    await this.ensureUsernameUniqueness(username);

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    return user;
  }

  private async ensureEmailUniqueness(
    email: string,
  ): Promise<User | undefined> {
    const existentUser = await this.usersRepository.findByEmail(email);

    if (existentUser) {
      throw new ConflictError(
        `An user with the same email ${email} already exists.`,
      );
    }

    return existentUser;
  }

  private async ensureUsernameUniqueness(
    username: string,
  ): Promise<User | undefined> {
    const existentUser = await this.usersRepository.findByUsername(username);

    if (existentUser) {
      throw new ConflictError(
        `An user with the same username ${username} already exists.`,
      );
    }

    return existentUser;
  }
}
