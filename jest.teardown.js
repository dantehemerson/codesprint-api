const { execSync } = require('child_process');

module.exports = async function () {

  console.log('Eliminando la imagen de docker', process.env.CI)
	const stdout = execSync(
		'docker-compose -p docker_app_test -f docker-compose.test.yml down',
	);
	// console.log(" RESULT ", stdout.toString('utf-8'));
	// TODO: Tests are not finish by it self. Finish manually. Solve It
  console.log("Finished")
	// process.exit(1);
};
