import {faker} from "@faker-js/faker";

export default async function catFactory() {
    const fivOrFelfOptions = ['FIV', 'FELV', 'both', 'none'];
    const random = Math.floor(Math.random() * 4);

    return {
        name: faker.animal.cat(),
        imageUrl: faker.image.animals() ,
        age:faker.finance.amount(0,30,0),
        fivOrFelf: fivOrFelfOptions[random],
        isVacinat: faker.datatype.boolean(),
        isCastraded: faker.datatype.boolean(),
        description:faker.lorem.paragraph(1)
    };
};
