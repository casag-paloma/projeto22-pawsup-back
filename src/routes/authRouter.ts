import { Router } from "express";
import { createUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/signin', createUser)

authRouter.post('/signup', (req,res)=> { return res.send('this is a signUp Route')})

export default authRouter;