import { IHashProvider } from '@modules/users/domain/interfaces/hash-provider.interface';

export class FakeHashProvider implements IHashProvider{
	public async compareHash(payload: string, hash: string): Promise<boolean> {
		return payload === hash
	}

	public async generateHash(payload: string): Promise<string> {
		return payload
	}
}
