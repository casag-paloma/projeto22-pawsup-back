import { Router } from "express";
import authRouter from "./authRouter";
import catRouter from "./catRouter";
import formRouter from "./formRouter";

const route = Router();
route.use(authRouter);
route.use(catRouter);
route.use(formRouter);

export default route;