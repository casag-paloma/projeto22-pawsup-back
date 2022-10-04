import * as userRepository from "../repositories/userRepository";
import { ILoginType, IUserType } from "../types/userType";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtil";
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

export async function loginUser(userData: ILoginType) {
    
    const user = await userRepository.getUserByEmail(userData.email);
    if(!user) throw notFoundError('this user is not cadastred yet, please sign up first')

    const comparePassword = bcrypt.compareSync(userData.password, user.password);
    console.log(comparePassword);
    if(!comparePassword) throw unauthorizedError('Incorrect user/password');

    const tokenData = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email
    }

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? 'token_secret_key';
    const EXPIRES_IN: string = process.env.TOKEN_EXPIRES_IN ?? '30 minutes';
    const jwtConfig = {
        expiresIn: EXPIRES_IN
    };

    const token = jwt.sign(tokenData, SECRET, jwtConfig);

    return token;
}

