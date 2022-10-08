/*
  Warnings:

  - You are about to drop the `submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_addressId_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_catId_fkey";

-- DropTable
DROP TABLE "submissions";

-- CreateTable
CREATE TABLE "forms" (
    "id" SERIAL NOT NULL,
    "catId" INTEGER NOT NULL,
    "applicantFullName" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "applicantPhoneNumber" TEXT NOT NULL,
    "applicantAge" INTEGER NOT NULL,
    "aplicantAddress" TEXT NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_catId_fkey" FOREIGN KEY ("catId") REFERENCES "cats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
