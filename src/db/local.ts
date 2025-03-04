import * as fs from "node:fs";
import { CreatedUser } from "../modules/users";
import { CreatedPost, Post } from "../modules/posts";

const USERS_FILE = "./users.json";
const POSTS_FILE = "./posts.json";

export const local = {
  users: new Map(),
  posts: new Map(),

  // USERS FUNCTIONS
  async addUser(data: CreatedUser) {
    if (this.users.has(data.id)) {
      throw new Error(`User with id ${data.id} exists`);
    }
    this.users.set(data.id, data);
    this.persistUsers();
  },
  async updateUser(id: string, data: any) {
    this.users.set(id, data);
    this.persistUsers();
  },
  async deleteUser(id: string) {
    this.users.delete(id);
    this.persistUsers();
  },
  async getUser(id?: string) {
    return id ? this.users.get(id) : Array.from(this.users.values());
  },
  async getUserBy(propKey: string, propVal: string | number) {
    for (const item of this.users.values()) {
      if (item?.[propKey] === propVal) {
        return item;
      }
    }
    return null;
  },
  async persistUsers() {
    fs.writeFileSync(
      USERS_FILE,
      JSON.stringify(Array.from(this.users.values()))
    );
  },

  //  POSTS FUNCTIONS
  async addPost(data: CreatedPost) {
    if (this.posts.has(data.id)) {
      throw new Error(`Post with id ${data.id} exists`);
    }
    this.posts.set(data.id, data);
    this.persistPosts();
  },
  async updatePost(id: string, data: Post) {
    this.posts.set(id, data);
    this.persistPosts();
  },
  async deletePost(id: string) {
    this.posts.delete(id);
    this.persistPosts();
  },
  async getPost(id?: string) {
    return id ? this.posts.get(id) : Array.from(this.posts.values());
  },
  async getPostBy(propKey: string, propVal: string | number) {
    for (const item of this.posts.values()) {
      if (item?.[propKey] === propVal) {
        return item;
      }
    }
    return null;
  },
  async persistPosts() {
    fs.writeFileSync(
      POSTS_FILE,
      JSON.stringify(Array.from(this.posts.values()))
    );
  },
};

export const init = async () => {
  if (fs.existsSync(USERS_FILE)) {
    try {
      const dataBuffer = fs.readFileSync(USERS_FILE);
      const data = JSON.parse(dataBuffer.toString());
      for (const item of data) {
        await local.addUser(item);
      }
    } catch (err) {
      console.error("DB init error (Users)", err);
    }
  }

  if (fs.existsSync(POSTS_FILE)) {
    try {
      const dataBuffer = fs.readFileSync(POSTS_FILE);
      const data = JSON.parse(dataBuffer.toString());
      for (const item of data) {
        await local.addPost(item);
      }
    } catch (err) {
      console.error("DB init error (Posts)", err);
    }
  }
};
