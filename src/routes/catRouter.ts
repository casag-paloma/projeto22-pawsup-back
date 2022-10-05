import { Router } from "express";
import { getCatById, getCats } from "../controllers/catController";
import { authUser } from "../middlewares.ts/authMiddleware";

const catRouter = Router();

catRouter.get('/cats', authUser, getCats);
catRouter.get('/cats/:id', authUser, getCatById);


export default catRouter;