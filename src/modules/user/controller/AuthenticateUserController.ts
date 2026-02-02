import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticateUserService } from "../service/AuthenticateUserService";
import { PrismaUserRepository } from "../repository/PrismaUserRepository";
import { HTTP_STATUS } from "@/shared/utils/httpStatus";

export class AuthenticateUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    // Implement the logic to handle user authentication
    try {
      const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });

      const { email, password } = authenticateBodySchema.parse(req.body);

      const userRepository = new PrismaUserRepository();
      const authenticateUserService = new AuthenticateUserService(userRepository);

      const { user, token } = await authenticateUserService.execute({ email, password });

      return res.status(HTTP_STATUS.OK).json({ user, token });
    
      
    } catch (error) {
      next(error);
    }
  }
}