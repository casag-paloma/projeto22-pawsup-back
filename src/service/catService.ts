import * as catRepository from "../repositories/catRepository";
import { ICatData } from "../types/catType";
import { notFoundError } from "../utils/errorUtil";

export async function getCats() {
    const cats = await catRepository.getCats();
    return cats;
};

export async function getCatById(id: number) {
    const cat = await catRepository.getCatsById(id);
    if(!cat) throw notFoundError('this cat is not on the system')
    return cat;
};

export async function createCat(catData: ICatData) {
    

    await catRepository.createCat(catData);

}