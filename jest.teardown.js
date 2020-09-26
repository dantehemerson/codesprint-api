const { execSync } = require('child_process');

module.exports = function () {
	const stdout = execSync(
		'docker-compose -p docker_app_test -f docker-compose.test.yml down',
	);
	console.log(stdout.toString('utf-8'));
	// TODO: Tests are not finish by it self. Finish manually
	process.exit(0);
};
