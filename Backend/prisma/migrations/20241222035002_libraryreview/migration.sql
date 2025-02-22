-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "Price" INTEGER;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];
