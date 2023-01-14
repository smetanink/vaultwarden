import { Context, NextFunction } from 'grammy';
import Logger, { BaseLogger, LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  safe: true,
  name: 'logger',
  level: 'trace',
  timestamp: true,
};

export const log: BaseLogger = Logger(loggerOptions);

export type LoggerContext = Context & { log: BaseLogger };

export default async function logger(ctx: LoggerContext, next: NextFunction): Promise<void> {
  ctx.log = log;
  await next();
}
