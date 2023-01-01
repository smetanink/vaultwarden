import { Context, Middleware, NextFunction } from 'grammy';
import Logger, { BaseLogger } from 'pino';

const log: BaseLogger = Logger({
  safe: true,
  name: 'logger',
  level: 'trace',
  timestamp: true,
});

export type LoggerContext = Context & { log: BaseLogger };

export default async function logger(ctx: LoggerContext, next: NextFunction): Promise<void> {
  ctx.log = log;
  await next();
}
