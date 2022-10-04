/*
  Warnings:

  - Added the required column `imageUrl` to the `cats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cats" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL;
