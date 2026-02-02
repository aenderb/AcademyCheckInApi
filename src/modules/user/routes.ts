import { Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { GetUserByIdController } from "./controller/GetUserByIdController";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { authLimiter, signupLimiter } from "@/shared/middlewares/rateLimiter";

// User routes
const routes = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const authenticateUserController = new AuthenticateUserController();

routes.post("/signup", signupLimiter, createUserController.handle);

routes.post("/signin", authLimiter, authenticateUserController.handle);

routes.get("/:id", getUserByIdController.handle);

export default routes;