import { authConfig } from '@config/auth.config';
import { IAuthService } from '@modules/users/domain/interfaces/auth-service.interface';
import { IJWTPayload } from '@modules/users/domain/interfaces/jwt-payload.interface';
import jwt from 'jsonwebtoken';

export class AuthService implements IAuthService {
	public signJWT(payload: IJWTPayload): string {
		return jwt.sign(payload, authConfig.jwtSecret);
	}
}
