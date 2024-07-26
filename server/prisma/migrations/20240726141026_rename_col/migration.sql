/*
  Warnings:

  - You are about to drop the column `description` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Agendamento` table. All the data in the column will be lost.
  - Added the required column `contetnt` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "contetnt" TEXT NOT NULL;
