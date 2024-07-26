/*
  Warnings:

  - Made the column `link` on table `Aula` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Aula` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Aula` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Aula` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Aula" ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);
