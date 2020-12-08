/* eslint-disable no-console */
import { execSync } from 'child_process';
import { teardown } from './src/__tests__/helpers/jest-global.setup';

export default async function () {
  const stdout = execSync(
    'docker-compose -p docker_app_test -f docker-compose.test.yml down',
  );
  console.log(stdout.toString('utf-8'));

  await teardown();
}
