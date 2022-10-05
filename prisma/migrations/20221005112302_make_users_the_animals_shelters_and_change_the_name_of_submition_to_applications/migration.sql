/*
  Warnings:

  - You are about to drop the column `fullName` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `submissions` table. All the data in the column will be lost.
  - Added the required column `userId` to the `cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantAge` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantEmail` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantFullName` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantPhoneNumber` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionDate` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_userId_fkey";

-- AlterTable
ALTER TABLE "cats" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "fullName",
DROP COLUMN "userId",
ADD COLUMN     "applicantAge" INTEGER NOT NULL,
ADD COLUMN     "applicantEmail" TEXT NOT NULL,
ADD COLUMN     "applicantFullName" TEXT NOT NULL,
ADD COLUMN     "applicantPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "submissionDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cats" ADD CONSTRAINT "cats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
