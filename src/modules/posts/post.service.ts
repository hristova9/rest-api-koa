import { CreatedPost, Post } from "./post.interface";
import { postRepository } from "./repository";

export const getPosts = () => postRepository.find();

export const getPostById = (id: string) => postRepository.findById(id);

export const createPost = async (data: Post, ownerId: string) => {
  return postRepository.create(data, ownerId);
};

export const updatePost = async (id: string, data: CreatedPost) => {
  const post = await postRepository.findById(id);
  if (!post) {
    throw new Error(`Post not found`);
  }
  if (post.ownerId !== data.ownerId) {
    throw new Error("Unauthorized: You can only update your own posts");
  }
  return postRepository.update(id, { ...post, ...data });
};

export const deletePostById = async (id: string, ownerId: string) => {
  const post = await postRepository.findById(id);
  if (!post) {
    throw new Error(`Post not found`);
  }
  if (post.ownerId !== ownerId) {
    throw new Error("Unauthorized: You can only delete your own posts");
  }
  return postRepository.delete(id);
};
