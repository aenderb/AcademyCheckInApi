import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../repository/IUserRepository";
import { IAuthenticateUserDTO } from "../dto/AuthenticateUserDTO";
import { UnauthorizedError } from "@/shared/errors";
import { env } from "@/env";

export class AuthenticateUserService {
  constructor(private userRepository: IUserRepository) {}
  async execute({ email, password }: IAuthenticateUserDTO) {
    // Lógica de autenticação do usuário
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }
    // Verificar a senha (hash)
    const isPasswordValid = await compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = jwt.sign(
      { sub: user.id }, 
      env.JWT_SECRET as jwt.Secret,
      { expiresIn: env.JWT_EXPIRATION_TIME } as jwt.SignOptions
    );

    // Remove password_hash do retorno
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  }
}