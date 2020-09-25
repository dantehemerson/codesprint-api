import 'reflect-metadata';
import '@shared/infra/typeorm';
import { createExpressServer } from 'routing-controllers';
import '@shared/container';
import { join } from 'path';

const portNumber = 3333;

const app = createExpressServer({
	controllers: [
		join(__dirname, '..', './src/modules/**/http/controllers/*.controller.ts'),
	],
});

app.listen(portNumber, () => {
	// eslint-disable-next-line no-console
	console.log('✅ - Server is listening to http://localhost:3333');
});
