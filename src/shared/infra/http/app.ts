import '@shared/container';
import { authorizationChecker } from '@shared/infra/http/routing-controllers/authorization-checker.helper';
import { jwtStrategy } from '@shared/infra/http/strategies/jwt.strategy';
import { connection } from '@shared/infra/typeorm';
import { defaultMetadataStorage } from 'class-transformer/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Application } from 'express';
import http from 'http';
import passport from 'passport';
import { join } from 'path';
import 'reflect-metadata';
import {
  Action,
  createExpressServer,
  getMetadataArgsStorage,
  RoutingControllersOptions,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { Connection } from 'typeorm';

export class App {
  public typormConnection: Connection;
  private expressApp: Application;
  private server: http.Server;
  private readonly routingControllersOptions: RoutingControllersOptions = {
    controllers: [
      join(
        process.cwd(),
        'src/modules/**/infra/http/controllers/*.controller.ts',
      ),
    ],
    authorizationChecker,
    currentUserChecker: async (action: Action) => action.request.user,
  };

  async init() {
    passport.use(jwtStrategy());

    this.typormConnection = await connection;
    this.expressApp = createExpressServer(this.routingControllersOptions);
    this.server = http.createServer(this.expressApp);
    this.initMiddleware();

    this.expressApp.get('/', (_, res) => {
      res.json({
        health: true,
      });
    });
  }

  private initMiddleware() {
    this.expressApp.use(passport.initialize());
    this.useOpenAPI();
  }

  private useOpenAPI() {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const storage = getMetadataArgsStorage();

    const spec = routingControllersToSpec(
      storage,
      this.routingControllersOptions,
      {
        components: {
          schemas,
          securitySchemes: {
            bearerAuth: {
              scheme: 'bearer',
              bearerFormat: 'JWT',
              type: 'http',
            },
          },
        },
        info: {
          description:
            'It provides an overview around our available endpoints, *you need to be authenticated to use our API*',
          title: 'CodeSprint API',
          version: '0.1.0',
        },
      },
    );

    this.expressApp.use(
      '/docs',
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(spec, {
        customSiteTitle: 'CodeSprint API',
        customCssUrl:
          'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-flattop.css',
      }),
    );
  }

  getServer() {
    return this.server;
  }

  getConnnection() {
    return this.typormConnection;
  }

  async listen(port?: number) {
    return new Promise((resolve, reject) =>
      this.server.listen(port).once('listening', resolve).once('error', reject),
    );
  }

  async close() {
    await this.getConnnection().close();
    await new Promise((resolve, reject) =>
      this.server.close().once('close', resolve).once('error', reject),
    );
  }
}
