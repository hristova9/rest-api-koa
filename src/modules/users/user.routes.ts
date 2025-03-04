import Router from "koa-router";
import {
  userValidationSchema,
} from "./user.validation-schema";
import { validator } from "../../core";
import { CreatedUser, User } from "./user.interface";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUser,
} from "./user.services";
import { authMiddleware } from "../../middleware/authMiddleware";

export const userRouter = new Router({
  prefix: "/users",
});

userRouter.use(authMiddleware);

userRouter.get("/", async (ctx) => {
  try {
    const email = ctx.query.email as string | undefined;
    ctx.body = await getUsers(email);
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(404, err.message);
    } else {
      ctx.throw(500, "Unknown error");
    }
  }
});

userRouter.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const user = await getUserById(id);
  if (!user) {
    ctx.throw(404, "User not found");
  }
  ctx.body = user;
});

userRouter.put("/:id", validator(userValidationSchema), async (ctx) => {
  const { id } = ctx.params;
  const userId = ctx.state.user?.id;
  const body = ctx.request.body as CreatedUser;

  if (!userId) {
    ctx.throw(401, "Unauthorized: User not authenticated");
  }

  if (id.toString() !== userId.toString()) {
    ctx.throw(403, "Forbidden: You can only update your own account");
  }

  try {
    const updatedUser = await updateUser(id, body as User);
    ctx.body = updatedUser;
  } catch (error) {
    console.error("Update User Error:", error);
    ctx.throw(400, "Failed to update user");
  }
});

userRouter.delete("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;
    if (ctx.state.user.id !== id) {
      ctx.throw(403, "Forbidden: You can only delete your own account");
    }

    await deleteUserById(id);
    ctx.status = 204;
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(404, err.message);
    } else {
      ctx.throw(500, "Unknown error");
    }
  }
});
