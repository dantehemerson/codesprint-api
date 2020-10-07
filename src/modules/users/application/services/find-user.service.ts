import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';
import { NotFoundError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.usersRepository.findById(id);
  }
}
