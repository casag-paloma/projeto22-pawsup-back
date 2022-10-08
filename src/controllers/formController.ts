import { Request, Response } from "express";
import * as formService from "../service/formService";
import { unauthorizedError } from "../utils/errorUtil";

export async function createForm(req: Request, res: Response) {
    const formData = req.body
    const {catId} = req.params;
    
    const isCatIdNotANumber = isNaN(Number(catId));
    if(isCatIdNotANumber) throw unauthorizedError();

    await formService.createForm(Number(catId), formData);

    return res.sendStatus(201);

}