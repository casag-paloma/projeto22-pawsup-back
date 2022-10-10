import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import { prisma } from "../../src/database";
import { ILoginType, IUserType } from "../../src/types/userType";

async function userBodyFactory() {
    return {
        name: faker.company.name(),
        email: faker.internet.email(),
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

function loginBodyFactory(user:IUserType){
    const loginUser: ILoginType = {
        email: user.email,
        password: user.password
    };
    return loginUser;
}



export default {
    userBodyFactory,
    userFactory,
    loginBodyFactory
}