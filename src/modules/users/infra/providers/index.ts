import { container } from 'tsyringe';
import { IHashProvider } from '../../domain/interfaces/hash-provider.interface';
import BCryptHashProvider from './bcrypt-hash.provider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
