/**
 * To define custom connection according to
 * docker-componse.test.yml image for testing
 */
import { createConnection } from 'typeorm';

// eslint-disable-next-line no-console
console.info('Using mocked typeorm connection');

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
