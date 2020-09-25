import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-users.repository';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { NotFoundError } from 'routing-controllers';
import { DeleteUserService } from './delete-user.service';
import { UpdateUserService } from './update-user.service';

describe(UpdateUserService.name, () => {
	let fakeUsersRepository: FakeUsersRepository;
	let service: DeleteUserService;

	beforeEach(() => {
		jest.clearAllMocks();
		fakeUsersRepository = new FakeUsersRepository();
		service = new DeleteUserService(fakeUsersRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it("should throw not-found error if user doesn't exist", async () => {
		const spyFindById = jest.spyOn(fakeUsersRepository, 'findById');

		await expect(service.execute(faker.random.uuid())).rejects.toBeInstanceOf(
			NotFoundError,
		);

		expect(spyFindById).toHaveBeenCalled();
	});

	it('should be able to delete user', async () => {
		const { id } = await fakeUsersRepository.create({
			email: 'already@email.com',
			name: 'Already',
			password: '123',
		});

		const spyFindById = jest.spyOn(fakeUsersRepository, 'findById');
		const spyDeleteById = jest.spyOn(fakeUsersRepository, 'deleteById');

		const response = await service.execute(id);

		expect(response).toBeUndefined();
		expect(spyFindById).toHaveBeenCalledWith(id);
		expect(spyDeleteById).toHaveBeenCalledWith(id);
	});
});
