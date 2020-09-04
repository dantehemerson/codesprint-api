import { container } from 'tsyringe';
import { HashProvider } from '../../domain/interfaces/hash-provider.interface';
import BCryptHashProvider from './bcrypt-hash.provider';

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider);
