import { Request, Response } from "express";
import * as authService from "../service/authService";

export async function createUser(req: Request, res: Response) {
    const userData = req.body;

    await authService.createUser(userData);
    
    res.sendStatus(201);
}

