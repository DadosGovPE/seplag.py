/*
  Warnings:

  - You are about to drop the column `data` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Aula` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "data",
DROP COLUMN "descricao",
DROP COLUMN "titulo",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "describe" TEXT NOT NULL DEFAULT 'Descrição padrão',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Título padrão',
ALTER COLUMN "link" SET DEFAULT 'Link padrão';
