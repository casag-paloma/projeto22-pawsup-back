import * as userRepository from "../repositories/userRepository";
import { IUserType } from "../types/userType";
import { conflictError } from "../utils/errorUtil";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(userData: IUserType) {
    
    const user = await userRepository.getUserByEmail(userData.email);
    if(user) throw conflictError('this user is already cadastred')

    const encrypedPassword = bcrypt.hashSync(userData.password, 10);
    userData.password = encrypedPassword;
    console.log(userData);
    await userRepository.create(userData);
}
