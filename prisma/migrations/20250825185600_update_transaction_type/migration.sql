-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" DECIMAL NOT NULL DEFAULT 0.0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "client_id" TEXT NOT NULL,
    CONSTRAINT "Account_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Account_client_id_key" ON "Account"("client_id");
