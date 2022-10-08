import {faker} from "@faker-js/faker";

export default async function loginFactory() {
    return {
        email: faker.internet.email() ,
        password:faker.internet.password(6)
    };
};