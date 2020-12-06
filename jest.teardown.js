const { execSync } = require('child_process');

module.exports = async function () {
	const stdout = execSync(
		'docker-compose -p docker_app_test -f docker-compose.test.yml down',
	);
	console.log(stdout.toString('utf-8'));
};
