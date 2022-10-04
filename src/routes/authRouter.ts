import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import signInSchema from "../schemas/signInSchema";

const authRouter = Router();

authRouter.post('/signup', joiValidation(signInSchema) ,createUser)

authRouter.post('/signin', loginUser);

export default authRouter;