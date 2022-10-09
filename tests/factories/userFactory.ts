import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import { prisma } from "../../src/database";
import { IUserType } from "../../src/types/userType";

async function generateNewUserFactory() {
    return {
        name: faker.company.name(),
        email: faker.internet.email() ,
        phoneNumber:faker.phone.number('21 9####-####'),
        password:faker.internet.password(6)
    };
};

async function userFactory(user: IUserType) {
    return prisma.user.create({
        data:{
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        }
    });
};

export default {
    generateNewUserFactory,
    userFactory
}