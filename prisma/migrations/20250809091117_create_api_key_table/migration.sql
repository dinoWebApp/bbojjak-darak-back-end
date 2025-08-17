/*
  Warnings:

  - You are about to drop the `ApiKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ApiKeys";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "api-keys" (
    "key" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "api-keys_key_key" ON "api-keys"("key");
