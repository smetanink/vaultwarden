import { Bot, BotError, Context } from 'grammy';

import logger, { log, LoggerContext } from './logger';
import commands from './commands';
import messages from './messages';

if (!process.env.TG_TOKEN) {
  throw new Error('Env TG_TOKEN must be set');
}

export const bot = new Bot<LoggerContext>(process.env.TG_TOKEN);

bot.use(logger);
commands(bot);
messages(bot);

bot.catch((error: BotError<Context>): void => {
  log.fatal(error);
});

export function startBot() {
  bot.start({
    onStart: () => {
      log.info('Bot started');
    },
  });
}
