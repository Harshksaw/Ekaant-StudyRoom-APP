-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "doorPosition" DOUBLE PRECISION[] DEFAULT ARRAY[0, 0, 0, 0, 0]::FLOAT[];

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "rotation" INTEGER NOT NULL DEFAULT 0;
