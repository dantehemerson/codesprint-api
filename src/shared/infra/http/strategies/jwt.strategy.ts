import { authConfig } from '@config/auth.config';
import { FindUserService } from '@modules/users/application/services/find-user.service';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions as JwtStrategyOptions,
} from 'passport-jwt';
import { NotFoundError, UnauthorizedError } from 'routing-controllers';
import { container } from 'tsyringe';

const passportOptions: JwtStrategyOptions = {
  secretOrKey: authConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy = () =>
  new JwtStrategy(passportOptions, (jwtPayload, done) => {
    const findUser = container.resolve(FindUserService);
    findUser
      .execute(jwtPayload.userId)
      .then(user => done(undefined, user))
      .catch(error => {
        if (error instanceof NotFoundError) {
          /** Rethrow UserNotFoundErroras UnauthorizedError */
          return done(new UnauthorizedError(error.message));
        }
        return done(error);
      });
  });
