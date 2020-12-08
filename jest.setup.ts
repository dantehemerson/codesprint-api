/* eslint-disable no-console */
import { execSync } from 'child_process';
import { App } from '@shared/infra/http/app';
import { setup } from './src/__tests__/helpers/jest-global.setup';

export default async function () {
  console.log('\nSetup Docker for testing');
  const stdout = execSync(
    'docker-compose -p docker_app_test -f docker-compose.test.yml up -d',
  );
  console.log(stdout.toString('utf-8'));

  await setup();
}
