import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';

type Optional<T> = T | undefined

export class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async findById(id: string): Promise<Optional<User>> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<Optional<User>> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: 'asaaaaaaaaa',
      name: userData.name,
      email: userData.email,
      password: userData.password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    if(userIndex !== -1) {
      this.users[userIndex] = user;
    }
    else {
      this.users.push(user);
    }
    return user;
  }
}
