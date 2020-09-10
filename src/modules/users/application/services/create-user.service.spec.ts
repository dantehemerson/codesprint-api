import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-create-users.repository';
import { FakeHashProvider } from '@modules/users/application/services/__mocks__/fake-hash.provider';

import { CreateUserService } from './create-user.service';
import { ConflictException } from '@shared/exceptions/conflict.exception';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a user', async () => {

    const user = await createUserService.execute({
      name: 'Uther the Lightbringer',
      email: 'uther@blizzard.com',
      password: 'silverorder',
    })

    expect(user).toHaveProperty('id');
    expect(user.password).toBe('silverorder');
	})

	it('should throw an error when a user with the same email exists', async () => {
		await fakeUsersRepository.create({
			name: 'John',
			email: 'john@email.com',
			password: 'asdf'
		})

		try {
			await createUserService.execute({
				name: 'Fulano',
				email: 'john@email.com',
				password: 'abcd'
			})
		} catch(error) {
			expect(error).toBeInstanceOf(ConflictException);
		}
	})

})
