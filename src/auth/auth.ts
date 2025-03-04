import { Context, Next } from "koa";
import { verifyToken } from "../core";

export const isLogged = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;
  
  if (!authHeader?.startsWith("Bearer ")) {
    return ctx.throw(401, "Unauthorized: Missing or invalid token");
  }

  const token = authHeader.replace("Bearer ", "").trim();
  
  if (!token || !verifyToken(token)) {
    return ctx.throw(403, "Forbidden: Invalid token");
  }

  await next();
};
