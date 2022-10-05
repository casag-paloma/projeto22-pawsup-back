import { Request, Response } from "express";
import * as catService from "../service/catService";
import { unauthorizedError } from "../utils/errorUtil";

export async function getCats(req: Request, res: Response) {
    
    const cats = await catService.getCats();

    return res.status(200).send(cats);
};

export async function getCatById(req: Request, res: Response) {
    const {id} = req.params;

    const isIdNotANumber = isNaN(Number(id));
    if(isIdNotANumber) throw unauthorizedError();

    const cat = await catService.getCatById(Number(id));

    return res.status(200).send(cat);
};
