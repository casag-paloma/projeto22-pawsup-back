import { Router } from "express";
import { createCat, deleteCat, getCatById, getCats, getCatsByUserId } from "../controllers/catController";
import { authUser } from "../middlewares.ts/authMiddleware";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import catSchema from "../schemas/catSchema";

const catRouter = Router();

catRouter.get('/cats', getCats);
catRouter.get('/cats/:id', getCatById);
catRouter.get('/:userId/cats', authUser, getCatsByUserId);

catRouter.post('/cats', authUser, joiValidation(catSchema), createCat);
catRouter.delete('/cats/:id', authUser, deleteCat);


export default catRouter;