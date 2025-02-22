/*
  Warnings:

  - You are about to drop the column `location` on the `Library` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];
