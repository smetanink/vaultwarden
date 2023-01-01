import { Bot } from 'grammy';

import { LoggerContext } from '../logger';
import { hideKeyboard } from '../keyboards';

import messages from '../constants/messages';

export default function message(bot: Bot<LoggerContext>) {
  bot.hears(messages.doNotSendMyContact.text, async (ctx) => {
    ctx.reply(messages.doNotSendMyContact.reply, {
      reply_markup: hideKeyboard,
    });
  });
}
