import { Bot, BotError, Context } from 'grammy';
import Logger from 'pino';

import logger, { LoggerContext } from './logger';
import commands from './commands';
import messages from './messages';

const log = Logger({
  safe: true,
  name: 'logger',
  level: 'trace',
  timestamp: true,
});

if (!process.env.TG_TOKEN) {
  throw new Error('Env TG_TOKEN must be set');
}

const bot = new Bot<LoggerContext>(process.env.TG_TOKEN);

bot.use(logger);
commands(bot);
messages(bot);

bot.start({
  onStart: () => {
    log.info('Bot started');
  },
});

bot.catch((error: BotError<Context>): void => {
  log.fatal(error);
});
