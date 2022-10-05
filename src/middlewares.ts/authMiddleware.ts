import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "../utils/errorUtil";


export async function authUser(
    req: Request, 
    res: Response,
    next: NextFunction
) {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) throw unauthorizedError();

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? 'token_secret_key';

    jwt.verify(token, SECRET, (err, tokenData) => {
        if(err) throw unauthorizedError();

        res.locals.user = tokenData;
        next();
    });


};