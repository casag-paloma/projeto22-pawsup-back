import {faker} from "@faker-js/faker";
import { prisma } from "../../src/database";
import { ICatData, ICatType } from "../../src/types/catType";

async function catBodyFactory() {
    const fivOrFelfOptions = ['FIV', 'FELV', 'both', 'none'];
    const random = Math.floor(Math.random() * 4);

    return {
        name: faker.animal.cat(),
        imageUrl: faker.image.animals() ,
        age:faker.finance.amount(0,30,0),
        genre: faker.name.sex(),
        fivOrFelf: fivOrFelfOptions[random],
        isVacinated: faker.datatype.boolean(),
        isCastraded: faker.datatype.boolean(),
        description:faker.lorem.paragraph(1)
    };
};


async function catFactory(cat: ICatData, userId: number ) {
    const newCat =  prisma.cat.create({
        data:{
            ...cat,
            userId
        }
    });
    return newCat;
};


export default{
    catBodyFactory,
    catFactory
}