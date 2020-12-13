import '@shared/container';
import { jwtStrategy } from '@shared/infra/http/strategies/jwt.strategy';
import { connection } from '@shared/infra/typeorm';
import { Application } from 'express';
import http from 'http';
import passport from 'passport';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { Connection } from 'typeorm';
import { createSwaggerDocsRouter } from './docs/swagger-oas.router';
import { routingControllersOptions } from './options/routing-controler.options';

export class App {
  public typormConnection: Connection;
  private expressApp: Application;
  private server: http.Server;

  async init() {
    passport.use(jwtStrategy());

    this.typormConnection = await connection;

    this.expressApp = createExpressServer(routingControllersOptions);
    this.server = http.createServer(this.expressApp);

    this.initMiddleware();
    this.initCustomRoutes();

    this.expressApp.get('/', (_, res) => {
      res.json({
        health: true,
      });
    });
  }

  private initMiddleware() {
    this.expressApp.use(passport.initialize());
  }

  private initCustomRoutes() {
    this.expressApp.use(createSwaggerDocsRouter());
  }

  getServer(): http.Server {
    return this.server;
  }

  getConnnection(): Connection {
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
