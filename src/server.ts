import 'reflect-metadata';
import 'express-async-errors';
import '@shared/infra/typeorm';
import { createExpressServer} from 'routing-controllers'
import UsersController from '@modules/users/http/controllers/users.controller'
import '@shared/container';

const portNumber = 3333;

const app = createExpressServer({
	controllers: [UsersController]
})

app.listen(portNumber, () => {
	console.log('✅ - Server is listening to http://localhost:3333');
})
