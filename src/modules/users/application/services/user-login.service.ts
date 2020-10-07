import { IAuthProvider } from '@modules/users/domain/interfaces/auth-provider.interface';
import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
import { IUserLoginResponse } from '@modules/users/domain/interfaces/user-login-response.interface';
import { IUsersRepository } from '@modules/users/domain/interfaces/user-repository.interface';
import { UnauthorizedError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';
import { IHashProvider } from '../../domain/interfaces/hash-provider.interface';

@injectable()
export class UserLoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('AuthProvider')
    private authProvider: IAuthProvider,
  ) {}

  async execute(email: string, password: string): Promise<IUserLoginResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('The email address or password is incorrect');
    }

    const isUserPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isUserPassword) {
      throw new UnauthorizedError('The email address or password is incorrect');
    }

    const payload: IJWTPayload = {
      email: user.email,
      userId: user.id,
    };

    const jwt = this.authProvider.signJWT(payload);

    return {
      jwt,
    };
  }
}
