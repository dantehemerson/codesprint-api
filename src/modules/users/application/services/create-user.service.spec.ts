import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-users.repository';
import { FakeHashProvider } from '@modules/users/application/services/__mocks__/fake-hash.provider';
import { ConflictError } from '@shared/errors/conflict.error';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a user', async () => {
    const userData = {
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
      username: 'uther',
    };

    const spyHashProvider = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUserService.execute(userData);

    expect(user).toMatchObject({
      ...userData,
      id: expect.any(String),
    });
    expect(spyHashProvider).toHaveBeenCalled();
  });

  it('should throw an error when a user with the same email exists', async () => {
    await fakeUsersRepository.create({
      name: 'John',
      email: 'john@email.com',
      username: 'john69',
      password: 'a',
    });

    try {
      await createUserService.execute({
        name: 'John2',
        email: 'john@email.com',
        username: 'john69',
        password: 'b',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictError);
    }
  });
});
