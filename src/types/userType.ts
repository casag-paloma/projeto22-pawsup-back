import {User} from "@prisma/client";

export type IUserType = Omit<User, "id">;
export type ILoginType = Omit<IUserType, "name" | "phoneNumber">