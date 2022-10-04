import { Router } from "express";
import { createUser } from "../controllers/authController";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import signInSchema from "../schemas/signInSchema";

const authRouter = Router();

authRouter.post('/signin', joiValidation(signInSchema) ,createUser)

authRouter.post('/signup', (req,res)=> { return res.send('this is a signUp Route')})

export default authRouter;