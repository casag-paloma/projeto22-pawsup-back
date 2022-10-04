/*
  Warnings:

  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "telephone" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
