/*
  Warnings:

  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookedSeat` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNo` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotDetails` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
CREATE SEQUENCE booking_friendid_seq;
ALTER TABLE "Booking" DROP COLUMN "date",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bookedSeat" JSONB NOT NULL,
ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bookingFinalDate" TIMESTAMP(3),
ADD COLUMN     "bookingPeriod" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "initialPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roomNo" INTEGER NOT NULL,
ADD COLUMN     "timeSlotDetails" JSONB NOT NULL,
ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionDetails" JSONB,
ALTER COLUMN "friendId" SET DEFAULT nextval('booking_friendid_seq');
ALTER SEQUENCE booking_friendid_seq OWNED BY "Booking"."friendId";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];
