import { Bot } from 'grammy';

import { LoggerContext } from '../logger';

import doNotSendContact from './do-not-send-contact';

export default function messages(bot: Bot<LoggerContext>) {
  doNotSendContact(bot);
}
