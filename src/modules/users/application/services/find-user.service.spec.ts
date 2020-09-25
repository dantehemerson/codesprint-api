import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-users.repository';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { NotFoundError } from 'routing-controllers';
import { FindUserService } from './find-user.service';
import { UpdateUserService } from './update-user.service';

describe(UpdateUserService.name, () => {
	let fakeUsersRepository: FakeUsersRepository;
	let service: FindUserService;

	beforeEach(() => {
		jest.clearAllMocks();
		fakeUsersRepository = new FakeUsersRepository();
		service = new FindUserService(fakeUsersRepository);
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

	it('should be able to find user', async () => {
		const userData: CreateUserDto = {
			email: 'already@email.com',
			name: 'Already',
			password: '123',
		};
		const { id } = await fakeUsersRepository.create(userData);

		const spyFindById = jest.spyOn(fakeUsersRepository, 'findById');

		const response = await service.execute(id);

		expect(response).toEqual({
			id: expect.any(String),
			...userData,
			updated_at: expect.any(Date),
			created_at: expect.any(Date),
			password: expect.any(String),
		});
		expect(spyFindById).toHaveBeenCalledWith(id);
	});
});
