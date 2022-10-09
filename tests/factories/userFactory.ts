import {faker} from "@faker-js/faker";

export default async function userFactory() {
    return {
        name: faker.company.name(),
        email: faker.internet.email() ,
        phoneNumber:faker.phone.number('21 9####-####'),
        password:faker.internet.password(6)
    };
};