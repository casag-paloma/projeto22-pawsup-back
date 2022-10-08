import {prisma} from "../database"
import { ICatType } from "../types/catType";

export async function getCats() {
    const cats = await prisma.cat.findMany();
    return cats
};

export async function getCatsById(id: number) {
    const cat = await prisma.cat.findUnique({where:{id}});
    return cat
};

export async function getCatsByNameAndUserId(name: string, userId: number) {
    const cat = await prisma.cat.findFirst({where:{name, userId}});
    return cat
};

export async function createCat(catData: ICatType) {
    await prisma.cat.create({data: catData});
};

export async function deleteCat(catId: number) {
    await prisma.cat.delete({where: {id: catId}});
};

export async function getFormsByUserId(userId:number) {
    const forms = await prisma.cat.findMany({
        where:{userId},
        select:{
            form: {
                include:{
                    cat:true
                }
            }
        }
    });

    return forms;
}

export default{
    getCats,
    getCatsById,
    getCatsByNameAndUserId,
    createCat,
    deleteCat,
    getFormsByUserId
}

