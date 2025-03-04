import config from "./config/index";
import Koa from "koa";
import Router from "koa-router";
import { errorHandler } from "./middleware/errorHandler";
import bodyParser from "koa-bodyparser";
import { db } from "./db";
import { authRouter } from "./auth";
import { postRouter } from "./modules/posts";
import { userRouter } from "./modules/users";

const start = async () => {
  await db.init();

  const app = new Koa();
  const router = new Router();

  router.get("/", async (ctx) => {
    ctx.body = "hello word!";
  });

  app.use(errorHandler(500, "Internal Server Error"));
  app.use(bodyParser());

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(authRouter.routes());
  app.use(authRouter.allowedMethods());

  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());

  app.use(postRouter.routes());
  app.use(postRouter.allowedMethods());

  app.listen(config.port, () => {
    console.log(`Listen ${config.port}`);
  });
};

start();
