// PrismaUserRepository

import { User } from "@prisma/client";
import { prisma } from "@/shared/infra/prisma/client";
import { ICreateUserDTO, IUserRepository } from "./IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        password_hash: false,
      },
    });

    return user;
  }
}
