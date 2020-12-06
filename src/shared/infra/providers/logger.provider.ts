/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoggerProvider } from '@shared/domain/interfaces/logger.interface';
import winston, { format } from 'winston';

export class Logger implements ILoggerProvider {
  private readonly winstonLogger: winston.Logger;

  constructor() {
    this.winstonLogger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });
  }

  info(message: string, context?: any) {
    this.winstonLogger.log('info', message, context);
  }

  error(message: string, trace: any, context?: any) {
    this.winstonLogger.log('error', message, { trace }, context);
  }

  warn(message: string, context?: any) {
    this.winstonLogger.log('warn', message, context);
  }

  debug(message: string, context?: any) {
    this.winstonLogger.log('debug', message, context);
  }
}
