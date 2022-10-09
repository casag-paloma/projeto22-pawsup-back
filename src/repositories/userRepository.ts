import { prisma } from "../database";
import { IUserType } from "../types/userType";

export async function create(userData: IUserType) {
    await prisma.user.create({
        data:userData
    });
};

export async function getUserByEmail(userEmail: string) {
    const user = await prisma.user.findFirst({ 
        where:{ email: userEmail}
    });

    return user;
};

export default {
    create,
    getUserByEmail
}