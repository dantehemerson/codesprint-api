import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import { routes } from '@shared/infra/http/routes/routes';

import '@shared/container';
import { errorHandler } from '@shared/infra/http/middleware/error-handler';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

const portNumber = 3333;

app.listen(portNumber, () => {
	console.log('✅ - Server is listening to http://localhost:3333');
});
