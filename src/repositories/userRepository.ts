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

export async function getUserById(id: number) {
    const user = await prisma.user.findFirst({ 
        where:{ id}
    });

    return user;
};


export default {
    create,
    getUserByEmail,
    getUserById
}