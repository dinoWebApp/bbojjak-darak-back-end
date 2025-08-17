-- CreateTable
CREATE TABLE "ApiKeys" (
    "key" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_key_key" ON "ApiKeys"("key");
