import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import signInSchema from "../schemas/signInSchema";
import userSchema from "../schemas/userSchema";

const authRouter = Router();

authRouter.post('/signup', joiValidation(userSchema) ,createUser)

authRouter.post('/signin', joiValidation(signInSchema), loginUser);

export default authRouter;