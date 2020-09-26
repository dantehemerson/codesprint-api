import { App } from './app';

const port = 3123;

async function main() {
	const app = new App();
	await app.init();
	await app.listen(port);
	console.log(`Listening on port ${port}`);
}

main();
