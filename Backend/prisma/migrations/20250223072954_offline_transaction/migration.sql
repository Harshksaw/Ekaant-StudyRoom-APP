/*
  Warnings:

  - You are about to drop the column `ac` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `coldWater` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `commonParking` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `discussionArea` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `floorMat` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `locker` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `lunchArea` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `movingChair` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `news` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `separateParking` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `separateWashroom` on the `Amenities` table. All the data in the column will be lost.
  - You are about to drop the column `wifi` on the `Amenities` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('REGISTRATION_FEE', 'BOOKING_PAYMENT', 'COMMISSION', 'REFUND', 'OFFLINE_BOOKING');

-- CreateEnum
CREATE TYPE "OfflinePaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_libraryOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "PanCardDetails" DROP CONSTRAINT "PanCardDetails_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlot" DROP CONSTRAINT "TimeSlot_seatId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "passportPhoto" TEXT;

-- AlterTable
ALTER TABLE "Amenities" DROP COLUMN "ac",
DROP COLUMN "coldWater",
DROP COLUMN "commonParking",
DROP COLUMN "discussionArea",
DROP COLUMN "floorMat",
DROP COLUMN "locker",
DROP COLUMN "lunchArea",
DROP COLUMN "movingChair",
DROP COLUMN "news",
DROP COLUMN "separateParking",
DROP COLUMN "separateWashroom",
DROP COLUMN "wifi",
ADD COLUMN     "amenities" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "timeSlotDetails" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "propertyType" TEXT,
ADD COLUMN     "uploadElectricityBill" TEXT,
ADD COLUMN     "uploadLeaseAgreement" TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::Int[];

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "adminId" INTEGER,
    "libraryId" INTEGER,
    "bookingId" INTEGER,
    "isOfflinePayment" BOOLEAN DEFAULT false,
    "offlinePaymentStatus" "OfflinePaymentStatus",
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

-- AddForeignKey
ALTER TABLE "PanCardDetails" ADD CONSTRAINT "PanCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_libraryOwnerId_fkey" FOREIGN KEY ("libraryOwnerId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
