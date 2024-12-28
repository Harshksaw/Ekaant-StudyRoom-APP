/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Library` table. All the data in the column will be lost.
  - The `coords` column on the `Library` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "thumbnail",
DROP COLUMN "coords",
ADD COLUMN     "coords" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];
