import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
import { AuthProvider } from './auth.provider';

describe(AuthProvider.name, () => {
  let service: AuthProvider;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthProvider();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign jwt', () => {
    const payload: IJWTPayload = {
      email: 'dante@gmail.com',
      userId: 'idk',
    };

    const result = service.signJWT(payload);

    expect(typeof result).toBe('string');
  });
});
