import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { User } from '@modules/users/infra/persistence/typeorm/entities/user.entity';

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByEmailAndReturnPassword(email: string): Promise<User | undefined>;
  deleteById(id: string): Promise<void>;
  create(data: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
