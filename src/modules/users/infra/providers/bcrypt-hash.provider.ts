import { IHashProvider } from '@modules/users/domain/interfaces/hash-provider.interface';
import { compare, hash } from 'bcryptjs';

export default class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return hash(payload, 8);
	}

	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}
}
