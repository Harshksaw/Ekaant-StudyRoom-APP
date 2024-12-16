/*
  Warnings:

  - You are about to alter the column `initialPrice` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `finalPrice` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `Price` on the `Library` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "initialPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "finalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Library" ALTER COLUMN "Price" SET DEFAULT 0,
ALTER COLUMN "Price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::FLOAT[];
