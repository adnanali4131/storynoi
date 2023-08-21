/*
  Warnings:

  - The `imageUrl` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userPrompt` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "userPrompt" TEXT NOT NULL,
DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" JSONB;