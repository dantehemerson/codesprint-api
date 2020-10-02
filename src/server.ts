import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';

import { createExpressServer, Action } from 'routing-controllers';
import { join } from 'path';
import passport from 'passport';
import { jwtStrategy } from '@shared/http/strategies/jwt.strategy';
import { authorizationChecker } from '@shared/http/routing-controllers/authorization-checker.helper';
import { appConfig } from '@config/app.config';

passport.use(jwtStrategy());

const app = createExpressServer({
	controllers: [
		join(__dirname, '..', './src/modules/**/http/controllers/*.controller.ts'),
	],
	authorizationChecker,
	currentUserChecker: async (action: Action) => action.request.user,
});

app.use(passport.initialize());

app.listen(appConfig.port, () => {
	// eslint-disable-next-line no-console
	console.log(`✅ - Server is listening to http://localhost:${appConfig.port}`);
});
