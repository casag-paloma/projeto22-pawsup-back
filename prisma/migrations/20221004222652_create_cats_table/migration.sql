-- CreateTable
CREATE TABLE "cats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT,
    "genre" TEXT NOT NULL,
    "fivOrFelf" TEXT,
    "isVacinated" BOOLEAN,
    "isCastraded" BOOLEAN,
    "description" TEXT,

    CONSTRAINT "cats_pkey" PRIMARY KEY ("id")
);
