import { Bot } from 'grammy';

import { LoggerContext } from 'tg-status-bot/logger';

import command from '../constants/commands';
import getContact from './getContact';
import start from './start';

export default function commands(bot: Bot<LoggerContext>) {
  bot.api.setMyCommands([command.start]);
  start(bot);
  getContact(bot);
}
