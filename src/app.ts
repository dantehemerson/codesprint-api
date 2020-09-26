import 'reflect-metadata';
import '@shared/container';
import { connection } from '@shared/infra/typeorm';
import { createExpressServer, Action } from 'routing-controllers';
import { join } from 'path';
import { Application } from 'express';
import { Connection } from 'typeorm';
import passport from 'passport';
import { jwtStrategy } from '@shared/http/strategies/jwt.strategy';
import { authorizationChecker } from '@shared/http/routing-controllers/authorization-checker.helper';

export class App {
	public typormConnection: Connection;

	private expressApp: Application;

	async init() {
		passport.use(jwtStrategy());

		this.typormConnection = await connection;
		// console.log(
		// 	'Dante: App -> init -> 		this.typormConnection.hashMetadata(User)',
		// 	this.typormConnection.hashMetadata(User),
		// );
		this.expressApp = createExpressServer({
			controllers: [
				join(
					__dirname,
					'..',
					'./src/modules/**/http/controllers/*.controller.ts',
				),
			],
			authorizationChecker,
			currentUserChecker: async (action: Action) => action.request.user,
		});

		this.expressApp.use(passport.initialize());

		this.expressApp.get('/', (_, res) => {
			res.json({
				health: true,
			});
		});
	}

	getServer() {
		return this.expressApp;
	}

	getConnnection() {
		return this.typormConnection;
	}

	listen(port?: number) {
		return new Promise(resolve => {
			this.expressApp.listen(port, () => {
				return resolve();
			});
		});
	}

	async close() {
		await this.getConnnection().close();
	}
}
