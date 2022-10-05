import * as catRepository from "../repositories/catRepository";
import { ICatData } from "../types/catType";
import { conflictError, notFoundError } from "../utils/errorUtil";

export async function getCats() {
    const cats = await catRepository.getCats();
    return cats;
};

export async function getCatById(id: number) {
    const cat = await catRepository.getCatsById(id);
    if(!cat) throw notFoundError('this cat is not on the system')
    return cat;
};

export async function createCat(userId: number, catData: ICatData) {
    
    //name must be unique in each shelter
    const cat = await catRepository.getCatsByNameAndUserId(catData.name, userId);
    if(cat) throw conflictError('this cat is already cadastred');
   
    const newCat = {
        ...catData,
        userId
    };
    console.log(newCat);
    await catRepository.createCat(newCat);

}