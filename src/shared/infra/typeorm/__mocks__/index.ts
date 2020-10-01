/**
 * To define custom connection according to
 * docker-componse image for testing
 */
import { createConnection } from 'typeorm';

console.log('Using mocked typeorm connection');

export const connection = createConnection({
	type: 'postgres',
	host: 'localhost',
	port: 5123,
	username: 'postgrestest',
	password: 'postgrestest',
	database: 'codesprint',
	entities: ['./src/modules/**/infra/persistence/typeorm/entities/*.ts'],
	migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
	migrationsRun: true,
	migrationsTransactionMode: 'all',
});
// src/share                                                           d/infra/typeorm/__mocks__/index.ts
