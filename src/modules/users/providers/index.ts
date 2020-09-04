import { container } from 'tsyringe';
import { HashProvider } from './hash-provider/models/hash-provider.interface';
import BCryptHashProvider from './hash-provider/implementations/bcrypt-hash.provider';

container.register<HashProvider>('HashProvider', BCryptHashProvider);
