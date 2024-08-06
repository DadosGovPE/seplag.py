-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "send" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Agendamento" ("content", "createdAt", "date", "id", "send") SELECT "content", "createdAt", "date", "id", "send" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
CREATE TABLE "new_Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "date" TEXT NOT NULL
);
INSERT INTO "new_Aula" ("date", "description", "id", "link", "title") SELECT "date", "description", "id", "link", "title" FROM "Aula";
DROP TABLE "Aula";
ALTER TABLE "new_Aula" RENAME TO "Aula";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
