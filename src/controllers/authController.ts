import { Request, Response } from "express";
import * as authService from "../service/authService";

export async function createUser(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);

    await authService.createUser(userData);
    
    res.sendStatus(201);
};

export async function loginUser(req: Request, res: Response) {
    const userData = req.body;
    console.log(userData);

    const token = await authService.loginUser(userData);
    
    res.status(200).send(token);
};


