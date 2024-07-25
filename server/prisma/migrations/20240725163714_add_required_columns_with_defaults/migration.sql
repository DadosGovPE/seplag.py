/*
  Warnings:

  - You are about to drop the column `describe` on the `Aula` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "describe",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
