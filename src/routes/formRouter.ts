import { Router } from "express";
import { createForm } from "../controllers/formController";
import joiValidation from "../middlewares.ts/joiValidationMiddleware";
import formSchema from "../schemas/formSchema";

const formRouter = Router();

formRouter.post('/forms/:catId', joiValidation(formSchema), createForm);

export default formRouter;