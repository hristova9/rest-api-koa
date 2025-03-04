import * as _ from "lodash";
import * as bcrypt from "bcrypt";
import { repository as userRepository } from "./repository";
import { User } from "./user.interface";

export const getUsers = async (email?: string) => {
  if (email) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  return userRepository.find();
};

export const getUserById = (id: string) => userRepository.findById(id);

export const createUser = async (data: User): Promise<User | null> => {
  if (await userRepository.findByEmail(data.email)) {
    throw new Error(`User with email ${data.email} already created`);
  }
  const user = Object.assign(data, {
    password: await bcrypt.hash(data.password, 10),
  });

  await userRepository.create(user);
  return user;
};

export const updateUser = async (id: string, data: User) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error(`User not found`);
  }
  const updatedUser = Object.assign(user, _.omit(data, ["id", "password"]));

  await userRepository.update(updatedUser);
  return updatedUser;
};

export const deleteUserById = async (id: string) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error(`User not found`);
  }

  await userRepository.delete(id);
};

export const getUserByEmail = (email: string) =>
  userRepository.findByEmail(email);
