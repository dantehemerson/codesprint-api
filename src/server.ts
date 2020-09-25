import 'reflect-metadata';
import '@shared/infra/typeorm';
import { createExpressServer, Action } from 'routing-controllers';
import '@shared/container';
import { join } from 'path';
import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions as JwtStrategyOptions,
} from 'passport-jwt';

const passportOptions: JwtStrategyOptions = {
	secretOrKey: 'secret',
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new JwtStrategy(passportOptions, (jwtPayload, done) => {
		console.log('========================== Dante: jwtPayload', jwtPayload);
		return done(undefined, {}, 'ads');
	}),
);

const portNumber = 3333;

const app = createExpressServer({
	controllers: [
		join(__dirname, '..', './src/modules/**/http/controllers/*.controller.ts'),
	],
	authorizationChecker: async (action: Action, roles: string[]) => {
		passport.authenticate('jwt', (err, use, jwt) => {
			console.log('Dante: jwt', jwt);
			console.log('Dante: use', use);
			console.log('Dante: err', err);
		})(action.request, action.response, action.next);
		return true;
	},
});

app.use(passport.initialize());

app.listen(portNumber, () => {
	// eslint-disable-next-line no-console
	console.log('✅ - Server is listening to http://localhost:3333');
});
