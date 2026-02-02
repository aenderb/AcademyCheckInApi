import { Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { GetUserByIdController } from "./controller/GetUserByIdController";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";

// User routes
const routes = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const authenticateUserController = new AuthenticateUserController();

routes.post("/signup", createUserController.handle);

routes.post("/signin", authenticateUserController.handle);

routes.get("/:id", getUserByIdController.handle);

export default routes;