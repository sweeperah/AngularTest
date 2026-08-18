-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "imageSeed" TEXT NOT NULL,
    "isDirectPay" BOOLEAN NOT NULL DEFAULT false
);
