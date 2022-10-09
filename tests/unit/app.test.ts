import userFactory from "../factories/userFactory";
import userRepository from "../../src/repositories/userRepository";
import authService from "../../src/service/authService";
import { ILoginType, IUserType } from "../../src/types/userType";
import { conflictError, notFoundError, unauthorizedError } from "../../src/utils/errorUtil";
import loginFactory from "../factories/loginFactory";
import bcrypt from "bcrypt";
import catRepository from "../../src/repositories/catRepository";
import catService from "../../src/service/catService";
import catFactory from "../factories/catFactory";
import formFactory from "../factories/formFactory";
import formRepository from "../../src/repositories/formRepository";
import formService from "../../src/service/formService";


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

        const token = await authService.loginUser(user);
        console.log(token)
        expect(userRepository.getUserByEmail).toBeCalled();
        expect(bcrypt.compareSync).toBeCalled();
        //expect().toBeInstanceOf(String);
    });
    it('não deve logar um usuario inexistente',async () => {
        const user : ILoginType = await loginFactory();

        jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementationOnce(():any => {});

        const promise = authService.loginUser(user);
        expect(promise).rejects.toEqual(notFoundError('this user is not cadastred yet, please sign up first'));
        expect(bcrypt.compareSync).not.toBeCalled();
    });
    it('não deve logar um usuario com senha errada',async () => {
        const user : ILoginType = await loginFactory();

        jest
        .spyOn(userRepository, 'getUserByEmail')
        .mockImplementationOnce(():any => {
            return user
        });

        jest
        .spyOn(bcrypt, 'compareSync')
        .mockImplementationOnce((): any=> {
            return false
        })

        const promise = authService.loginUser(user);
        expect(promise).rejects.toEqual(unauthorizedError('Incorrect user/password'));
    });
});


describe('Unit tests of catService', ()=>{
    it('deve retornar uma lista dos gatos',async () => {
        jest
        .spyOn(catRepository, 'getCats')
        .mockImplementationOnce((): any=>{});

        await catService.getCats();

        expect(catRepository.getCats).toBeCalled();
    });


    it('deve retornar informações de um gato especifico',async () => {
        const cat = await catFactory();
        const id = 1;
        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {
            return cat
        });

        await catService.getCatById(id);

        expect(catRepository.getCatsById).toBeCalled();
    });
    it('não deve retornar informações de um gato inexistente',async () => {
        const id = 1;
        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {});

        const promise = catService.getCatById(id);
        expect(promise).rejects.toEqual(notFoundError('this cat is not on the system'));
    });

    it('deve criar um gato',async () => {
        const cat = await catFactory();
        const userId = 1;

        jest
        .spyOn(catRepository, 'getCatsByNameAndUserId')
        .mockImplementationOnce(():any =>{})

        jest
        .spyOn(catRepository, 'createCat')
        .mockImplementationOnce(():any =>{})

        await catService.createCat(userId, cat);

        expect(catRepository.getCatsByNameAndUserId).toBeCalled();
        expect(catRepository.createCat).toBeCalled();
    });
    it('não deve criar um gato duplicado para um mesmo usuário',async () => {
        const cat = await catFactory();
        const userId = 1;

        jest
        .spyOn(catRepository, 'getCatsByNameAndUserId')
        .mockImplementationOnce(():any =>{
            return cat
        })

        const promise = catService.createCat(userId, cat);

        expect(promise).rejects.toEqual(conflictError('this cat is already cadastred'));
    });


    it('deve deletar um gato',async () => {
        const userId = 1;
        const catId = 2;
        const cat = await catFactory();

        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {
            return cat
        });

        jest
        .spyOn(catService, 'compareUsers')
        .mockReturnValueOnce(true)
  
        jest
        .spyOn(catRepository, 'deleteCat')
        .mockImplementationOnce(():any => {});

        await catService.deleteCat(userId, catId);

        expect(catRepository.getCatsById).toBeCalled();
        expect(catService.compareUsers).toBeCalled();
        expect(catRepository.deleteCat).toBeCalled();

    });
    it('não deve deletar um gato inexistente',
   async () => {
    const userId = 1;
    const catId = 2;

    jest
    .spyOn(catRepository, 'getCatsById')
    .mockImplementationOnce(():any => {});

    const promise = catService.deleteCat(userId, catId);
    expect(promise).rejects.toEqual(notFoundError('this cat is not on the system'));
   });
    it('não deve deletar um gato que não foi criado pelo usuário',async () => {
        const userId = 1;
        const catId = 2;
        const cat = await catFactory();

        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {
            return cat
        });

        jest
        .spyOn(catService, 'compareUsers')
        .mockReturnValueOnce(false)
  
        const promise = catService.deleteCat(userId, catId);
        expect(promise).rejects.toEqual(unauthorizedError('this cat does not belong to this user'));
    });
});

describe('Unit tests of formService', ()=>{
    it('deve criar um formulário ',async () => {
        const catId = 1;
        const form = await formFactory();

        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {
            return form
        });
        
        jest
        .spyOn(formRepository, 'getFormByApplicantEmailAndCatId')
        .mockImplementationOnce(():any => {});

        jest
        .spyOn(formRepository, 'createForm')
        .mockImplementationOnce(():any => {});

        await formService.createForm(catId, form);

        expect(catRepository.getCatsById).toBeCalled();
        expect(formRepository.getFormByApplicantEmailAndCatId).toBeCalled();
        expect(formRepository.createForm).toBeCalled();
    });
    it('não deve criar um formulário para um gato inexistente',async () => {
        
        const catId = 1;
        const form = await formFactory();

        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {});
        
        const promise = formService.createForm(catId, form);
        expect(promise).rejects.toEqual(notFoundError('this cat is not on the system'));


    });
    it('não deve criar um formulario duplicado para um mesmo gato e cliente',async () => {
        const catId = 1;
        const form = await formFactory();


        jest
        .spyOn(catRepository, 'getCatsById')
        .mockImplementationOnce(():any => {
            return form
        });
        
        jest
        .spyOn(formRepository, 'getFormByApplicantEmailAndCatId')
        .mockImplementationOnce(():any => {
            return form
        });
        
        const promise = formService.createForm(catId, form);
        expect(promise).rejects.toEqual(conflictError('You already made a form for this cat'));

    });
    

    it('deve retornar uma lista dos formulários cujos gatos foram criados pelos usuários em questão',async () => {
        const userId = 1;

        jest
        .spyOn(catRepository, 'getFormsByUserId')
        .mockImplementationOnce(():any =>{})

        await formService.getFormsByUserId(userId);

        expect(catRepository.getFormsByUserId).toBeCalled();
    });
});

