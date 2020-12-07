import { join } from 'path';
import { authorizationChecker } from '@shared/infra/http/routing-controllers/authorization-checker.helper';
import { Action, RoutingControllersOptions } from 'routing-controllers';

export const routingControllersOptions: RoutingControllersOptions = {
  controllers: [
    join(
      process.cwd(),
      'src/modules/**/infra/http/controllers/*.controller.ts',
    ),
  ],
  authorizationChecker,
  currentUserChecker: async (action: Action) => action.request.user,
};
