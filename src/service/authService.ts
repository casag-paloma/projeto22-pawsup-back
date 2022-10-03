import * as userRepository from "../repositories/userRepository";
import { IUserType } from "../types/userType";
import { conflictError } from "../utils/errorUtil";

export async function createUser(userData: IUserType) {
    
    const user = await userRepository.getUserByEmail(userData.email);
    if(user){
        throw conflictError('this user is already cadastred');
    }

    await userRepository.create(userData);
}