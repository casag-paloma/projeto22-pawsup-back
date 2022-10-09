import app from "../../src/app";
import supertest from "supertest";

import { prisma } from "../../src/database";
import { deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
import userFactory from "../factories/userFactory";
import { ILoginType, IUserType } from "../../src/types/userType";

beforeEach(async () => {
    await deleteAllData();
});

const server = supertest(app);

describe('Tests with the user', () =>{
    it('test POST /signup , with a valid user',async () => {
        const user = await userFactory.generateNewUserFactory();

        const result = await server
        .post('/signup')
        .send(user);

        const createdUser = await prisma.user.findFirst({
            where:{email: user.email}
        });

        expect(result.status).toBe(201);
        expect(createdUser).not.toBeNull();
    });
    it('test POST /signup , with an invalid user (repeated user)',async () => {
        const user = await userFactory.generateNewUserFactory();

        await userFactory.userFactory(user);

        const result = await server
        .post('/signup')
        .send(user);

        expect(result.status).toBe(409);
        
    });

    it('test POST /signin , with a valid user',async () => {
        const user = await userFactory.generateNewUserFactory();
        await userFactory.userFactory(user);
 
        const loginUser : ILoginType = userFactory.generateNewLoginFactory(user);

        const response = await server
        .post('/signin')
        .send(loginUser);

        const token = response.text;
        console.log(token);

        expect(token).not.toBeNull();
    });
    it('test POST /signup , with an invalid user (inexistent user)',async () => {

        const user : IUserType = await userFactory.generateNewUserFactory();
        const loginUser : ILoginType = userFactory.generateNewLoginFactory(user);

        const response = await server
        .post('/signin')
        .send(loginUser);

        expect(response.status).toBe(404);
        
    });
})
afterAll(async () => {
    await disconnectPrisma();
});