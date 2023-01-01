import { ReplyKeyboardMarkup, ReplyKeyboardRemove } from 'grammy/out/types.node';

import messages from './constants/messages';

export const startKeyboard: ReplyKeyboardMarkup = {
  one_time_keyboard: true,
  keyboard: [
    [
      {
        text: messages.sendMyContact.text,
        request_contact: true,
      },
    ],
    [
      {
        text: messages.doNotSendMyContact.text,
      },
    ],
  ],
};

export const hideKeyboard: ReplyKeyboardRemove = {
  remove_keyboard: true,
};

export const mainKeyboard: ReplyKeyboardMarkup = {
  one_time_keyboard: false,
  keyboard: [
    [
      {
        text: 'some',
      },
    ],
    [
      {
        text: 'button',
      },
    ],
  ],
};
