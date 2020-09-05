import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import './database';
import { routes } from '@shared/infra/http/routes/routes';

import '@shared/container';
import { errorHandler } from '@shared/infra/http/middleware/error-handler';
import AppError from '@shared/errors/app.error';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

const portNumber = 3333;

app.listen(portNumber, () => {
	console.log('✅ - Server is listening to http://localhost:3333');
});
