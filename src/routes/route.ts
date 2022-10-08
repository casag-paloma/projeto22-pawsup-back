import { Router } from "express";
import authRouter from "./authRouter";
import catRouter from "./catRouter";

const route = Router();
route.use(authRouter);
route.use(catRouter);

export default route;