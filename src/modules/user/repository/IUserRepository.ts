// IUserRepository

import { User } from "@prisma/client";

// DTO para o Repository - Dados já processados
export interface ICreateUserDTO {
  name: string;
  email: string;
  password_hash: string;
}

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<Omit<User, 'password_hash'> | null>;
}
