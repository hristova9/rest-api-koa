import Router from "koa-router";
import { authMiddleware } from "../../middleware/authMiddleware";
import { CreatedPost, Post } from "./post.interface";
import {
  createPost,
  deletePostById,
  getPostById,
  getPosts,
  updatePost,
} from "./post.service";

export const postRouter = new Router({
  prefix: "/posts",
});

postRouter.use(authMiddleware);

postRouter.get("/", async (ctx) => {
  ctx.body = await getPosts();
});

postRouter.post("/", async (ctx) => {
  const { title, description } = ctx.request.body as Post;
  const ownerId = ctx.state.user.id;

  const post = await createPost({ title, description }, ownerId);
  ctx.status = 201;
  ctx.body = post;
});

postRouter.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const post = await getPostById(id);
  if (!post) {
    ctx.throw(404, "Post not found");
  }
  ctx.body = post;
});

postRouter.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  const ownerId = ctx.state.user.id;
  const body = ctx.request.body as CreatedPost;

  ctx.body = await updatePost(id, { ...body, ownerId });
});

postRouter.delete("/:id", async (ctx) => {
  const { id } = ctx.params;
  const ownerId = ctx.state.user.id;

  await deletePostById(id, ownerId);
  ctx.status = 204;
});