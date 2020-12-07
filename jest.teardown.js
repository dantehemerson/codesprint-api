const { execSync } = require('child_process');
const { teardown } = require('./src/__tests__/helpers/jest-global.setup')

module.exports = async function () {
	const stdout = execSync(
		'docker-compose -p docker_app_test -f docker-compose.test.yml down',
  );
  await teardown()
	console.log(stdout.toString('utf-8'));
};
