import Router from "koa-router";
import * as bcrypt from "bcrypt";
import { createToken, validator } from "../core";
import { Context } from "vm";
import { tokenBlacklist } from "../middleware/authMiddleware";
import {
  CreatedUser,
  createUser,
  createUserValidationSchema,
  getUserByEmail,
  User,
} from "../modules/users";
import { signInValidationSchema } from "./auth.validation-schema";
export * from "./auth";

export const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post(
  "/sign-up",
  validator(createUserValidationSchema),
  async (ctx) => {
    try {
      const user = await createUser(ctx.request.body as User);
      if (!user) {
        ctx.throw(400, "User creation failed");
        return;
      }
      const { password, ...userWithoutPassword } = user;

      ctx.status = 201;
      ctx.body = userWithoutPassword;
    } catch (err) {
      if (err instanceof Error) {
        ctx.throw(400, err.message);
      } else {
        ctx.throw(500, "Unknown error");
      }
    }
  }
);

authRouter.post("/sign-in", validator(signInValidationSchema), async (ctx) => {
  try {
    const { email, password } = ctx.request.body as CreatedUser;
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = createToken(user);

    ctx.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    ctx.body = {
      token,
    };
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(401, err.message);
    } else {
      ctx.throw(500, "Unknown error");
    }
  }
});

authRouter.post("/sign-out", async (ctx: Context) => {
  const authHeader = ctx.headers.authorization;
  const cookieToken = ctx.cookies.get("token");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "").trim()
    : cookieToken;

  if (!token) {
    return ctx.throw(400, "No token found, already logged out");
  }

  if (tokenBlacklist.has(token)) {
    return ctx.throw(400, "Token already revoked, you are logged out");
  }

  tokenBlacklist.add(token);

  ctx.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  ctx.status = 200;
  ctx.body = { message: "Successfully logged out" };
});
