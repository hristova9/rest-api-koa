import jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import config from "../config";

export const tokenBlacklist = new Set<string>();

export const authMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;
  const cookieToken = ctx.cookies.get("token");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "").trim()
    : cookieToken;

  if (!token) {
    return ctx.throw(401, "Unauthorized: Missing or invalid token");
  }

  if (tokenBlacklist.has(token)) {
    return ctx.throw(401, "Unauthorized: Token has been revoked");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret!) as { id: string };

    if (!decoded.id) {
      ctx.throw(401, "Invalid token structure");
    }

    ctx.state.user = { id: decoded.id };
    await next();
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(401, "Invalid token");
    } else {
      ctx.throw(500, "Unknown error");
    }
  }
};
