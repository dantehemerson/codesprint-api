import { Action } from 'routing-controllers';
import passport from 'passport';

export const authorizationChecker = (action: Action) =>
  new Promise<boolean>((resolve, reject) => {
    passport.authenticate('jwt', (error, user) => {
      if (error) reject(error);
      if (!user) resolve(false);
      // Asign user to request to be used in CurrentUser decorator
      // eslint-disable-next-line no-param-reassign
      action.request.user = user;
      resolve(true);
    })(action.request, action.response, action.next);
  });
