import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-users.repository';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { FindBy } from '@modules/users/domain/enums/find-by.enum';
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

  describe('sucess', () => {
    const userData: CreateUserDto = {
      email: 'john.doe@email.com',
      name: 'John Doe',
      username: 'johndoe',
      password: '123',
    };

    let userId: string;

    beforeEach(async () => {
      const { id } = await fakeUsersRepository.create(userData);
      userId = id;
    });

    it('should return found user', async () => {
      const response = await service.execute(FindBy.id, userId);

      expect(response).toEqual({
        id: expect.any(String),
        ...userData,
        updated_at: expect.any(Date),
        created_at: expect.any(Date),
        password: expect.any(String),
      });
    });

    it('shoud call to findById when by="id" option is passed', async () => {
      const spyFindById = jest.spyOn(fakeUsersRepository, 'findById');

      await service.execute(FindBy.id, userId);

      expect(spyFindById).toHaveBeenCalledWith(userId);
    });

    it('shoud call to findByUsername when by="username" option is passed', async () => {
      const spyFindByUsername = jest.spyOn(
        fakeUsersRepository,
        'findByUsername',
      );

      await service.execute(FindBy.username, userData.username);

      expect(spyFindByUsername).toHaveBeenCalledWith(userData.username);
    });
  });

  it("should throw not-found error if user doesn't exist", async () => {
    const spyFindById = jest.spyOn(fakeUsersRepository, 'findById');

    await expect(
      service.execute(FindBy.id, faker.random.uuid()),
    ).rejects.toBeInstanceOf(NotFoundError);

    expect(spyFindById).toHaveBeenCalled();
  });
});
