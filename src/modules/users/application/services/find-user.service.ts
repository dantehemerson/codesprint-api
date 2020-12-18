import { FindBy } from '@modules/users/domain/enums/find-by.enum';
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

  async execute(by: FindBy, idOrUsername: string): Promise<User | undefined> {
    const user = await (by === FindBy.id
      ? this.usersRepository.findById(idOrUsername)
      : this.usersRepository.findByUsername(idOrUsername));

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
