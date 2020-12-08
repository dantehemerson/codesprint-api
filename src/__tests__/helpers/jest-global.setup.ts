/* eslint-disable no-console */
import { App } from '@shared/infra/http/app';
import { ConnectionOptions } from 'typeorm';

let app: App;

const typeormTestConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5123,
  username: 'postgrestest',
  password: 'postgrestest',
  synchronize: true,
  database: 'codesprint',
  entities: ['./src/modules/**/infra/persistence/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  migrationsRun: true,
  migrationsTransactionMode: 'all',
};

export async function setup() {
  console.log('🚀 Starting App server');
  app = new App({ connectionOptions: typeormTestConnectionOptions });
  await app.init();
  await app.listen();
}

export async function teardown() {
  console.log('Closing App server');
  await app.close();
}
