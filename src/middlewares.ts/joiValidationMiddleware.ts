import { NextFunction, Request, Response } from "express"
import { wrongSchemaError } from "../utils/errorUtil";

const joiValidation = (schema: any) =>{
    return (
        req: Request,
        res: Response,
        next: NextFunction
    )=>{
        const validation = schema.validate(req.body, {abortEarly: false });

        if(validation.error){
            const message = validation.error.details.map((details: any)=> details.message);
            console.log(message);

            throw  wrongSchemaError(message);
        }

        next();
    };
};


export default joiValidation;