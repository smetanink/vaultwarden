import { Bot } from 'grammy';

import { DBConnection } from '../connectors/database';
import Users from '../entities/user';

import { LoggerContext } from '../logger';
import { hideKeyboard, mainKeyboard } from '../keyboards';

import message from '../constants/messages';

export default async function getContact(bot: Bot<LoggerContext>) {
  bot.on(':contact', async (ctx) => {
    const phoneNumber: string | undefined = ctx.update.message?.contact.phone_number;
    const tgNumber: number | undefined = ctx.update.message?.contact.user_id;
    const contactName = ctx.update.message?.contact.first_name || '';
    const allowedPhones: Array<string> = (process.env.TG_ALLOWED_PHONES || '').split(',');

    if (tgNumber && phoneNumber && allowedPhones.indexOf(phoneNumber) > -1) {
      const userRepository = DBConnection.getRepository(Users);
      await userRepository.upsert({ phoneNumber, tgNumber }, ['phoneNumber']);

      ctx.log.info(`Added contact: ${phoneNumber}`);

      ctx.reply(message.sendMyContact.reply.success(contactName), {
        parse_mode: 'Markdown',
        reply_markup: hideKeyboard, //TODO replace to mainKeyboard
      });
    } else {
      ctx.reply(message.sendMyContact.reply.error(phoneNumber || ''), {
        parse_mode: 'Markdown',
        reply_markup: hideKeyboard,
      });
    }
  });
}
