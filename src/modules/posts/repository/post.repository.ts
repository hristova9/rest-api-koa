import * as crypto from "crypto";
import { db } from "../../../db";
import { CreatedPost, Post } from "../post.interface";

const postLocalRepository = {
  find: () => db.local.getPost(),
  findById: (id: string) => db.local.getPost(id),
  findByOwnerId: (ownerId: string) => db.local.getPostBy("ownerId", ownerId),
  async create(data: Post, ownerId: string) {
    const post = { ...data, id: crypto.randomUUID(), ownerId };
    await db.local.addPost(post);
    return post;
  },
  update: (id: string, data: CreatedPost) => db.local.updatePost(id, data),
  delete: (id: string) => db.local.deletePost(id),
};

export default postLocalRepository;
