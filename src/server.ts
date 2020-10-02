import 'reflect-metadata';
import '@shared/infra/typeorm';
import {
	createExpressServer,
	Action,
	UnauthorizedError,
} from 'routing-controllers';
import '@shared/container';
import { join } from 'path';
import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions as JwtStrategyOptions,
} from 'passport-jwt';
import { authConfig } from '@config/auth';
import { container } from 'tsyringe';
import { FindUserService } from '@modules/users/application/services/find-user.service';

const passportOptions: JwtStrategyOptions = {
	secretOrKey: authConfig.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new JwtStrategy(passportOptions, (jwtPayload, done) => {
		const findUser = container.resolve(FindUserService);
		findUser
			.execute(jwtPayload.userId)
			.then(user => {
				if (!user) {
					return done(new UnauthorizedError('User not found'));
				}
				return done(undefined, user);
			})
			.catch(error => {
				return done(error);
			});
	}),
);

const portNumber = 3333;

const app = createExpressServer({
	controllers: [
		join(__dirname, '..', './src/modules/**/http/controllers/*.controller.ts'),
	],
	authorizationChecker: (action: Action) =>
		new Promise<boolean>((resolve, reject) => {
			passport.authenticate('jwt', (error, user) => {
				if (error) reject(error);
				if (!user) resolve(false);
				// Asign user to request to be used in CurrentUser decorator
				// eslint-disable-next-line no-param-reassign
				action.request.user = user;
				resolve(true);
			})(action.request, action.response, action.next);
		}),
	currentUserChecker: async (action: Action) => action.request.user,
});

app.use(passport.initialize());

app.listen(portNumber, () => {
	// eslint-disable-next-line no-console
	console.log('✅ - Server is listening to http://localhost:3333');
});
