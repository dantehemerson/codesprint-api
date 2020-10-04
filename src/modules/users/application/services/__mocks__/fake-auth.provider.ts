import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
import { AuthProvider } from '@modules/users/infra/providers/auth.provider';

export class FakeAuthProvider implements AuthProvider {
	public signJWT(payload: IJWTPayload): string {
		return JSON.stringify(payload);
	}
}
