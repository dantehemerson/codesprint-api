import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-users.repository';
import { FakeHashProvider } from '@modules/users/application/services/__mocks__/fake-hash.provider';
import { ConflictError } from '@shared/errors/conflict.error';
import faker from 'faker';
import { NotFoundError } from 'routing-controllers';
import { UpdateUserService } from './update-user.service';

describe(UpdateUserService.name, () => {
	let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let service: UpdateUserService;

  beforeEach(() => {
		jest.clearAllMocks()
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    service = new UpdateUserService(fakeUsersRepository, fakeHashProvider);
	});

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should throw not-found error if user doesn\'t exist', async () => {
		const userData = {
			name: 'New',
		}

		const spyFakeUsersRepository = jest.spyOn(fakeUsersRepository, 'findById')

		await expect(service.execute(faker.random.uuid(), userData)).rejects.toBeInstanceOf(NotFoundError)

		/** should be called to find for user */
		expect(spyFakeUsersRepository).toHaveBeenCalled()
	})

	describe('when email is passed', () => {
		it('should throw conflict error if email already exists for another user', async () => {
			await fakeUsersRepository.create({
				email: 'already@email.com',
				name: 'Already',
				password: '123'
			})

			/** user to update */
			const { id } = await fakeUsersRepository.create({
				email: 'john@email.com',
				name: 'John',
				password: 'abc'
			})

			const userData = {
				email: 'already@email.com',
			}

			const spyFindUsersRepository = jest.spyOn(fakeUsersRepository, 'findById')
			const spyFindEmailUsersRepository = jest.spyOn(fakeUsersRepository, 'findByEmail')

			await expect(service.execute(id, userData)).rejects.toBeInstanceOf(ConflictError)

			/** should be called to find for user */
			expect(spyFindUsersRepository).toHaveBeenCalled()
			expect(spyFindEmailUsersRepository).toHaveBeenCalled()
		})

		it('should not throw conflict error if email is the same than the user updating',async () => {
			const { id } = await fakeUsersRepository.create({
				email: 'john@email.com',
				name: 'John',
				password: 'abc'
			})

			const userData = {
				email: 'john@email.com',
			}

			const spyFindUsersRepository = jest.spyOn(fakeUsersRepository, 'findById')
			const spyFindEmailUsersRepository = jest.spyOn(fakeUsersRepository, 'findByEmail')

			const response = await service.execute(id, userData)

			expect(response).toMatchObject(userData)
			expect(spyFindUsersRepository).toHaveBeenCalled()
			expect(spyFindEmailUsersRepository).not.toHaveBeenCalled()
		})
	})

	describe('when email is not passed', () => {
		it('should not call to findByEmail in user repository', async () => {
			/** user to update */
			const { id } = await fakeUsersRepository.create({
				email: 'john@email.com',
				name: 'John',
				password: 'abc'
			})

			const userData = {
				name: 'New Name',
				password: 'newpassword'
			}

			const spyFindUsersRepository = jest.spyOn(fakeUsersRepository, 'findById')
			const spyFindEmailUsersRepository = jest.spyOn(fakeUsersRepository, 'findByEmail')

			await service.execute(id, userData)

			/** should be called to find for user */
			expect(spyFindUsersRepository).toHaveBeenCalled()
			expect(spyFindEmailUsersRepository).not.toHaveBeenCalled()
		})
	})

	it('should return updated user & update the update_at field',async () => {
		const { id, updated_at } = await fakeUsersRepository.create({
			email: 'john@email.com',
			name: 'John',
			password: 'abc'
		})

		const userData = {
			email: 'abc@email.com',
			name: 'ABC',
			password: 'xyz'
		}

		const response = await service.execute(id, userData)

		expect(response).toMatchObject(userData)
		expect(updated_at < response.updated_at).toBe(true)
	})
})
