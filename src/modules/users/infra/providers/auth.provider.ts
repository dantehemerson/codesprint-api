import { authConfig } from '@config/auth.config';
import { IAuthProvider } from '@modules/users/domain/interfaces/auth-provider.interface';
import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';

export class AuthProvider implements IAuthProvider {
	public signJWT(payload: IJWTPayload): string {
		return jwt.sign(payload, authConfig.jwtSecret);
	}
}
