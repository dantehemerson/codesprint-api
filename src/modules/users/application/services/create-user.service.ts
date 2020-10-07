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

  async execute({ name, email, password }: CreateUserDto): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new ConflictError(
        `An user with the same email ${email} already exists.`,
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
