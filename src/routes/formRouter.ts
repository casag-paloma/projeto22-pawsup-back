import { Router } from "express";
import { createForm, getFormsByUserId } from "../controllers/formController";
import { authUser } from "../middlewares.ts/authMiddleware";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import formSchema from "../schemas/formSchema";

const formRouter = Router();

formRouter.post('/forms/:catId', joiValidation(formSchema), createForm);
formRouter.get('/forms', authUser, getFormsByUserId);

export default formRouter;