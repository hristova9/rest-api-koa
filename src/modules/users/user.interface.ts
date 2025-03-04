export interface User {
    username: string;
    email: string;
    password: string;
}

export interface CreatedUser extends User{
    id: string;
}

export interface UserRepository {
    find: () => Promise<CreatedUser[]>;
    findById: (id: string) => Promise<CreatedUser | void>;
    findByEmail: (email: string) => Promise<CreatedUser | void>;
    create: (data: User) => Promise<CreatedUser>;
    update: (data: CreatedUser) => Promise<void>;
    delete: (id: string) => Promise<void>;
  }