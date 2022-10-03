import { Router } from "express";
import authRouter from "./authRouter";

const route = Router();
route.use(authRouter)

export default route;