import { Context, Next } from "koa";

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export function errorHandler(defaultStatus = 400, defaultMessage = "Bad Request") {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err: unknown) {
      const status = (err as any)?.status ?? defaultStatus;
      const message = isError(err) ? err.message : defaultMessage;

      ctx.status = status;
      ctx.body = { message };
    }
  };
}