-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roomName" TEXT,
ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "seatName" TEXT;
