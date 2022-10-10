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

export async function getCatsByUserId(req: Request, res: Response) {
    const {user} = res.locals;
    console.log(user);
    const cats = await catService.getCatsByUserId(Number(user.userId));

    return res.status(200).send(cats);
};

export async function createCat(req: Request, res: Response) {
    const {user} = res.locals;
    const catData = req.body;

    console.log(user, catData);
    await catService.createCat(Number(user.userId), catData);

    return res.sendStatus(201);
}

export async function deleteCat(req: Request, res: Response) {
    const {user} = res.locals;
    const {id} = req.params;

    const isIdNotANumber = isNaN(Number(id));
    if(isIdNotANumber) throw unauthorizedError();

    console.log(user, id);

    await catService.deleteCat(user.userId, Number(id));

    return res.sendStatus(204);
};



