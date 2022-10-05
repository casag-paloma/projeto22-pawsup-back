import {prisma} from "../database"
import { ICatData } from "../types/catType";

export async function getCats() {
    const cats = await prisma.cat.findMany();
    return cats
};

export async function getCatsById(id: number) {
    const cat = await prisma.cat.findUnique({where:{id}});
    return cat
};

export async function getCatsByNameAndUserId(name: string, userId: number) {
    const cat = await prisma.cat.findFirst({where:{name}});
    return cat
};


export async function createCat(catData: ICatData) {
    await prisma.cat.create({data: catData});
};




