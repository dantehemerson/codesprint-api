import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';

describe(AuthService.name, () => {
	let service: AuthService;

	beforeEach(() => {
		jest.clearAllMocks();
		service = new AuthService();
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
