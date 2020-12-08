let app;

const typeormTestConnectionOptions = {
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

exports.setup = async () => {
  app = { hola: 'uniqness' };
};

exports.teardown = async () => {
  console.log(app);
};
