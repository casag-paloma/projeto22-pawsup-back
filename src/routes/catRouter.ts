import { Router } from "express";
import { createCat, getCatById, getCats } from "../controllers/catController";
import { authUser } from "../middlewares.ts/authMiddleware";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import catSchema from "../schemas/catSchema";

const catRouter = Router();

catRouter.get('/cats', getCats);
catRouter.get('/cats/:id', getCatById);

catRouter.post('/cats', authUser, joiValidation(catSchema), createCat);


export default catRouter;