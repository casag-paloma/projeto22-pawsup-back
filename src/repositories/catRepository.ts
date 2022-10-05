import {prisma} from "../database"

export async function getCats() {
    const cats = await prisma.cat.findMany();
    return cats
};

export async function getCatsById(id: number) {
    const cat = await prisma.cat.findUnique({where:{id}});
    return cat
};

