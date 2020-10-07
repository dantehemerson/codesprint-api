import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { NotFoundError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.usersRepository.deleteById(id);
  }
}
