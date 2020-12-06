export interface ILoggerProvider {
  info(message: string, payload?: any): unknown;
  error(message: string, trace?: any, context?: string): unknown;
  warn(message: string, context?: any): unknown;
  debug?(message: string, context?: any): unknown;
  // verbose?(message: string, context?: any): unknown;
}
