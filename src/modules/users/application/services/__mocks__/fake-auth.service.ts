import { IAuthService } from '@modules/users/domain/interfaces/auth-service.interface';
import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';

export class FakeAuthService implements IAuthService {
	public signJWT(payload: IJWTPayload): string {
		return JSON.stringify(payload);
	}
}
