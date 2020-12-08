const { execSync } = require('child_process');
const { setup } = require('./src/__tests__/helpers/jest-global.setup')


module.exports = async function () {
	console.log('\nSetup Docker for testing');
	const stdout = execSync(
		'docker-compose -p docker_app_test -f docker-compose.test.yml up -d',
	);

  await setup()
	console.log(stdout.toString('utf-8'));
};
