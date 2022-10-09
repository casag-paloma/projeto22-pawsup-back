import { prisma } from "../../src/database";

export async function deleteAllData() {
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE forms CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE cats CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE users CASCADE`,
    ]);
};

export async function disconnectPrisma() {
    await prisma.$disconnect();
};