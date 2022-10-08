import catRepository from "../repositories/catRepository";
import { ICatData } from "../types/catType";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtil";

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

};

export async function deleteCat(userId: number, catId: number) {
    
    const cat = await getCatById(catId);

    const compareUsers = (cat.userId === userId)
    if(!compareUsers) throw unauthorizedError('this cat does not belong to this user')
   
    await catRepository.deleteCat(catId);

};

export default{
    getCats,
    getCatById,
    createCat,
    deleteCat
}