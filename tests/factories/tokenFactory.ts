import userFactory from "./userFactory";
import jwt  from "jsonwebtoken";

const SECRET: string = process.env.TOKEN_SECRET_KEY ?? 'token_secret_key';
const EXPIRES_IN: string = process.env.TOKEN_EXPIRES_IN ?? '30 minutes';
const jwtConfig = {
    expiresIn: EXPIRES_IN
};

async function tokenFactory() {
    const user = await userFactory.userBodyFactory();
    const createdUser = await userFactory.userFactory(user);

    const tokenData = {
        userId: createdUser.id,
        userName: createdUser.name,
        userEmail: createdUser.email
    };

    const token = jwt.sign(tokenData, SECRET, jwtConfig);
    return token;
};

function userIdFromTokenFactory(token:string){
    const  {userId}  = jwt.verify(token, SECRET) as {userId : number};
    return userId;
}


export default{
    tokenFactory,
    userIdFromTokenFactory
}