import { Cat } from "@prisma/client";

export type ICatType = Omit<Cat, 'id'>;
export type ICatData = Partial<ICatType> & Pick<ICatType, 'name' | 'imageUrl'>;