import app from "../../src/app";
import supertest from "supertest";
import  {faker} from "@faker-js/faker";

import { prisma } from "../../src/database";
import { deleteAllData, disconnectPrisma } from "../factories/scenarioFactory";
import userFactory from "../factories/userFactory";
import { ILoginType, IUserType } from "../../src/types/userType";
import catFactory from "../factories/catFactory";
import tokenFactory from "../factories/tokenFactory";
import formFactory from "../factories/formFactory";
import { IFormData } from "../../src/types/formType";

beforeEach(async () => {
    await deleteAllData();
});

const server = supertest(app);

describe('Tests with the user', () =>{
    it('test POST /signup , with a valid user',async () => {
        const user = await userFactory.userBodyFactory();

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
        const user = await userFactory.userBodyFactory();

        await userFactory.userFactory(user);

        const result = await server
        .post('/signup')
        .send(user);

        expect(result.status).toBe(409);
        
    });

    it('test POST /signin , with a valid user',async () => {
        const user = await userFactory.userBodyFactory();
        await userFactory.userFactory(user);
 
        const loginUser : ILoginType = userFactory.loginBodyFactory(user);

        const response = await server
        .post('/signin')
        .send(loginUser);

        const token = response.text;
        console.log(token);

        expect(response.status).toBe(200);
        expect(token).not.toBeNull();
    });
    it('test POST /signup , with an invalid user (inexistent user)',async () => {

        const user : IUserType = await userFactory.userBodyFactory();
        const loginUser : ILoginType = userFactory.loginBodyFactory(user);

        const response = await server
        .post('/signin')
        .send(loginUser);

        expect(response.status).toBe(404);
        
    });
});


describe('Tests with the cats', () =>{
    it('test POST /cats, with a valid cat',async () => {
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();

        const result = await server
        .post('/cats')
        .set('Authorization', `Bearer ${token}`)
        .send(cat);

        expect(result.status).toBe(201);

    });
    it('test POST /cats , with an invalid cat (repeated cat)',async () => {
        
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();
        const userId = tokenFactory.userIdFromTokenFactory(token);

        await catFactory.catFactory(cat, userId);

        const result = await server
        .post('/cats')
        .set('Authorization', `Bearer ${token}`)
        .send(cat);

        expect(result.status).toBe(409);

    });

    it('test DELETE /cats/:catId, with a valid cat',async () => {
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();
        const userId = tokenFactory.userIdFromTokenFactory(token);

        const {id} = await catFactory.catFactory(cat, userId);

        const result = await server
        .delete(`/cats/${id}`)
        .set('Authorization', `Bearer ${token}`);

        expect(result.status).toBe(204);

    });
    it('test DELETE /cats/:catId , with an invalid cat (inexistent cat)',async () => {
        const token = await tokenFactory.tokenFactory();
        const id = faker.finance.amount(0,1000,0);

        const result = await server
        .delete(`/cats/${id}`)
        .set('Authorization', `Bearer ${token}`);

        expect(result.status).toBe(404);

    });
    it('test DELETE /cats/:catId , with an invalid cat (cat doesn belong to the user)',async () => {
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();
        const userId = tokenFactory.userIdFromTokenFactory(token);

        const {id} = await catFactory.catFactory(cat, userId);

        const tokenFromAnotherUser = await tokenFactory.tokenFactory();

        const result = await server
        .delete(`/cats/${id}`)
        .set('Authorization', `Bearer ${tokenFromAnotherUser}`);

        expect(result.status).toBe(401);

        
    });

    it('test GET /cats',async () => {
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();
        const userId = tokenFactory.userIdFromTokenFactory(token);

        await catFactory.catFactory(cat, userId);

        const response = await server
        .get('/cats')

        console.log(response, response.body)
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);

        
    });
    
    it('test GET /cats/:catId, with a valid cat',async () => {
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();
        const userId = tokenFactory.userIdFromTokenFactory(token);

        const {id} = await catFactory.catFactory(cat, userId);

        const response = await server
        .get(`/cats/${id}`)

        console.log(response, response.body)
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    });
    it('test GET /cats/:catId, with an invalid cat (inexistent cat)',async () => {
        const id = faker.finance.amount(0,1000,0);
       
        const response = await server
        .get(`/cats/${id}`)

        expect(response.status).toBe(404);
        
    });

    it('test GET /user/cats, with a valid user',async () => {
        const cat = await catFactory.catBodyFactory();
        const token = await tokenFactory.tokenFactory();
        const userId = tokenFactory.userIdFromTokenFactory(token);
        await catFactory.catFactory(cat, userId);

        const response = await server
        .get(`/user/cats`)
        .set('Authorization', `Bearer ${token}`);

        console.log(response, response.body)
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    });
});


describe('Tests with the forms', () =>{
it('test POST /form/:catId , with a valid form',async () => {
    const cat = await catFactory.catBodyFactory();
    const token = await tokenFactory.tokenFactory();
    const userId = tokenFactory.userIdFromTokenFactory(token);
    const createdCat = await catFactory.catFactory(cat, userId);
    const catId = createdCat.id;

    const form: IFormData = await formFactory.formBodyFactory();

    const result = await server
    .post(`/forms/${catId}`)
    .send(form);

    expect(result.status).toBe(201);

});
it('test POST /form/:catId , with an invalid catId (inexistent cat)',async () => {
    const catId = faker.finance.amount(0,1000,0);
    const form : IFormData = await formFactory.formBodyFactory();

    const result = await server
    .post(`/forms/${catId}`)
    .send(form);

    expect(result.status).toBe(404);

});
it('test POST /forms/:catId , with an invalid form (repeated catId and applicant email)',async () => {
    const cat = await catFactory.catBodyFactory();
    const token = await tokenFactory.tokenFactory();
    const userId = tokenFactory.userIdFromTokenFactory(token);
    const createdCat = await catFactory.catFactory(cat, userId);
    const catId = createdCat.id;

    const form: IFormData = await formFactory.formBodyFactory();
    await formFactory.formFactory(form, catId)

    const result = await server
    .post(`/forms/${catId}`)
    .send(form);

    expect(result.status).toBe(409);

    
});

it('test GET /forms',async () => {
    const cat = await catFactory.catBodyFactory();
    const token = await tokenFactory.tokenFactory();
    const userId = tokenFactory.userIdFromTokenFactory(token);
    const createdCat = await catFactory.catFactory(cat, userId);
    const catId = createdCat.id;

    const form: IFormData = await formFactory.formBodyFactory();
    await formFactory.formFactory(form, catId)

    const response = await server
    .get('/forms')
    .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);

})
});

afterAll(async () => {
    await disconnectPrisma();
});