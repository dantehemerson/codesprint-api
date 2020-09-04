import 'reflect-metadata';
import express from 'express';
import './database';
import { routes } from '@shared/infra/http/routes/routes';

import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

const portNumber = 3333;

app.listen(portNumber, () => {
	console.log('✅ - Server is listening to http://localhost:3333');
});
