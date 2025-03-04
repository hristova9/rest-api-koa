import * as crypto from 'node:crypto';
import { db } from '../../../db';
import { User, UserRepository, CreatedUser } from '../user.interface'; 

const userLocalRepository: UserRepository = {
  find() {
    return db.local.getUser();
  },
  findById(id: string) {
    return db.local.getUser(id);
  },
  findByEmail(email: string) {
    return db.local.getUserBy('email', email);
  },
  async create(data: User) {
    const user = Object.assign(data, { id: crypto.randomUUID() });
    await db.local.addUser(user);
    return user;
  },
  update(data: CreatedUser) {
    return db.local.updateUser(data.id, data);
  },
  delete(id: string) {
    return db.local.deleteUser(id)
  }
}

export default userLocalRepository;