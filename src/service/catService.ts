import catRepository from "../repositories/catRepository";
import userRepository from "../repositories/userRepository";
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

export async function getCatsByUserId(userId: number) {
    const cats = await catRepository.getCatsByUserId(userId);
    return cats;
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

export function compareUsers(catUserId: number, userId: number){

    if(catUserId === userId) return true
    else return false
}

export async function deleteCat(userId: number, catId: number) {
    
    const cat = await getCatById(catId);

    const compareUsersId = compareUsers(cat.userId, userId);
    if(!compareUsersId) throw unauthorizedError('this cat does not belong to this user')
   
    await catRepository.deleteCat(catId);

};

export default{
    getCats,
    getCatById,
    getCatsByUserId,
    createCat,
    deleteCat,
    compareUsers
}