/*
  Warnings:

  - Made the column `libraryId` on table `Library` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Library" ALTER COLUMN "libraryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::FLOAT[];
