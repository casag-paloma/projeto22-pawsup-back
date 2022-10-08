import userFactory from "../factories/userFactory";
import userRepository from "../../src/repositories/userRepository";
import authService from "../../src/service/authService";
import { ILoginType, IUserType } from "../../src/types/userType";
import { conflictError } from "../../src/utils/errorUtil";
import loginFactory from "../factories/loginFactory";
import bcrypt from "bcrypt";


beforeEach(async () => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});


describe('Unit tests of authService', ()=>{
    it('deve criar um usuario ', async ()=>{
        const user : IUserType = await userFactory();

        jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementationOnce(():any => {});

        jest
        .spyOn(userRepository, 'create')
        .mockImplementationOnce((): any=> {})

        await authService.createUser(user);

        expect(userRepository.getUserByEmail).toBeCalled();
        expect(userRepository.create).toBeCalled();
    });

    it('não deve criar um usuario duplicado',async () => {
        const user : IUserType = await userFactory();

        jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementationOnce(():any => {
            return user
        });

        const promise = authService.createUser(user);
        expect(promise).rejects.toEqual(conflictError('this user is already cadastred'));
        expect(userRepository.create).not.toBeCalled();
    });

    it('deve logar o usuario ',async () => {
        const user : ILoginType = await loginFactory();

        jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementationOnce(():any => {
            return user
        });

        jest
        .spyOn(bcrypt, 'compareSync')
        .mockImplementationOnce((): any=> {
            return true
        })

        await authService.loginUser(user);

        expect(userRepository.getUserByEmail).toBeCalled();
        expect(bcrypt.compareSync).toBeCalled();
    });
    it.todo('não deve logar um usuario inexistente');
    it.todo('não deve logar um usuario com senha errada');
});

describe('Unit tests of catService', ()=>{
    it.todo('deve retornar uma lista dos gatos');

    it.todo('deve retornar informações de um gato especifico');
    it.todo('não deve retornar informações de um gato inexistente');

    it.todo('deve criar um gato ');
    it.todo('não deve criar um gato duplicado para um mesmo usuário');

    it.todo('deve deletar um gato ');
    it.todo('não deve deletar um gato inexistente');
    it.todo('não deve deletar um gato que não foi criado pelo usuário');
});

describe('Unit tests of formService', ()=>{
    it.todo('deve criar um formulário ');
    it.todo('não deve criar um formulário para um gato inexistente');
    it.todo('não deve criar um formulario duplicado para um mesmo gato e cliente');
    
    it.todo('deve retornar uma lista dos formulários cujos gatos foram criados pelos usuários em questão');
});

