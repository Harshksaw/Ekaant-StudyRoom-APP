/*
  Warnings:

  - You are about to drop the column `Price` on the `Library` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "Price",
ALTER COLUMN "registrationFees" SET DEFAULT 500;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];
