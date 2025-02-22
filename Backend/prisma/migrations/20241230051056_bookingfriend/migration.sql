/*
  Warnings:

  - You are about to drop the column `friendId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_friendId_fkey";

-- DropIndex
DROP INDEX "Booking_friendId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "friendId";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];

-- CreateTable
CREATE TABLE "BookingFriend" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "BookingFriend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingFriend" ADD CONSTRAINT "BookingFriend_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingFriend" ADD CONSTRAINT "BookingFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
