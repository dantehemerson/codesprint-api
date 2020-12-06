import { FakeHashProvider } from '@modules/users/application/services/__mocks__/fake-hash.provider';
import { FakeUsersRepository } from '@modules/users/application/services/__mocks__/fake-users.repository';
import { CreateUserDto } from '@modules/users/domain/dto/create-user.dto';
import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { UnauthorizedError } from 'routing-controllers';
import { UserLoginService } from './user-login.service';
import { FakeAuthProvider } from './__mocks__/fake-auth.provider';

describe(UserLoginService.name, () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let fakeAuthProvider: FakeAuthProvider;
  let service: UserLoginService;

  beforeEach(() => {
    jest.clearAllMocks();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeAuthProvider = new FakeAuthProvider();

    service = new UserLoginService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeAuthProvider,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should reject UnauthorizedError when user doesn't exist", async () => {
    const spyFindByEmailAndReturnPassword = jest.spyOn(
      fakeUsersRepository,
      'findByEmailAndReturnPassword',
    );

    await expect(
      service.execute(faker.internet.email(), faker.internet.password()),
    ).rejects.toBeInstanceOf(UnauthorizedError);

    /** should call to find for user */
    expect(spyFindByEmailAndReturnPassword).toHaveBeenCalled();
  });

  it('should resolve when password passed match', async () => {
    const user: CreateUserDto = {
      email: 'jhon@email.com',
      name: 'John',
      password: 'abc',
    };
    const spyCompareHashPassword = jest.spyOn(fakeHashProvider, 'compareHash');

    await fakeUsersRepository.create(user);

    const response = await service.execute(user.email, user.password);

    expect(response).toEqual({
      jwt: expect.any(String),
    });

    expect(spyCompareHashPassword).toHaveBeenCalledWith(
      user.password,
      user.password,
    );
  });

  it('should return signed JWT when user is authorized', async () => {
    const user: CreateUserDto = {
      email: 'jhon@email.com',
      name: 'John',
      password: 'abc',
    };
    const { id } = await fakeUsersRepository.create(user);
    const signedResponse = 'signed-jwt';
    const spySignJWT = jest
      .spyOn(fakeAuthProvider, 'signJWT')
      .mockReturnValue(signedResponse);

    const response = await service.execute(user.email, user.password);

    expect(spySignJWT).toHaveBeenCalledWith({
      email: user.email,
      userId: id,
    } as IJWTPayload);
    expect(response).toEqual({
      jwt: signedResponse,
    });
  });

  it("should reject UnauthorizedError when password passed doesn't match", async () => {
    const user: CreateUserDto = {
      email: 'jhon@email.com',
      name: 'John',
      password: 'abc',
    };
    const spyCompareHashPassword = jest.spyOn(fakeHashProvider, 'compareHash');

    await fakeUsersRepository.create(user);

    await expect(service.execute(user.email, 'xyz')).rejects.toBeInstanceOf(
      UnauthorizedError,
    );
    expect(spyCompareHashPassword).toHaveBeenCalledWith('xyz', user.password);
  });
});
