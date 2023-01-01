import { Bot } from 'grammy';

import { LoggerContext } from '../logger';
import { startKeyboard } from '../keyboards';

import command from '../constants/commands';

export default function start(bot: Bot<LoggerContext>) {
  bot.command(command.start.command, async (ctx) => {
    ctx.reply(command.start.reply, {
      parse_mode: 'Markdown',
      reply_markup: startKeyboard,
    });
  });
}
