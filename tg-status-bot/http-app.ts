import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-pino-logger';
import Router from '@koa/router';

import { bot } from './tg-bot';

import { DBConnection } from './connectors/database';
import User from './entities/user';

export const app = new Koa();
export const router = new Router();

// There is no auth due to running inside docker network
router.post('/message', async (ctx) => {
  const body: { message?: string } = ctx.request.body || {};
  if (body.message) {
    const userRepository = DBConnection.getRepository(User);

    const users: User[] = await userRepository.find();

    for (const user of users) {
      await bot.api.sendMessage(user.tgNumber, body.message);
    }
    ctx.status = 204;
  } else {
    ctx.status = 422;
  }
});

app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

export function startServer() {
  app.listen(process.env.HTTP_PORT || 3000);
}
