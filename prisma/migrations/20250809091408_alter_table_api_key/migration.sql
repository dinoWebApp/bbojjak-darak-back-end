/*
  Warnings:

  - Added the required column `id` to the `api-keys` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_api-keys" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_api-keys" ("created_at", "key", "updated_at") SELECT "created_at", "key", "updated_at" FROM "api-keys";
DROP TABLE "api-keys";
ALTER TABLE "new_api-keys" RENAME TO "api-keys";
CREATE UNIQUE INDEX "api-keys_key_key" ON "api-keys"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
