-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('REGISTRATION_FEE', 'BOOKING_PAYMENT', 'COMMISSION', 'REFUND', 'OFFLINE_BOOKING');

-- CreateEnum
CREATE TYPE "OfflinePaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELED');

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "Banner" TEXT[],

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "locationImage" TEXT,
    "coords" DOUBLE PRECISION[],
    "appId" SERIAL NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Dob" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "accountType" TEXT NOT NULL DEFAULT 'Admin',
    "address" JSONB NOT NULL,
    "profileImage" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "phoneNumber" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passportPhoto" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdhaarCardDetails" (
    "id" SERIAL NOT NULL,
    "adhaarNumber" TEXT NOT NULL,
    "adhaarCardFile" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "AdhaarCardDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanCardDetails" (
    "id" SERIAL NOT NULL,
    "panNumber" TEXT NOT NULL,
    "panCardFile" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "PanCardDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "additionalDetails" TEXT[],
    "image" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "phoneNumber" VARCHAR(10) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "libraryOwnerId" INTEGER,
    "name" TEXT NOT NULL,
    "longDescription" TEXT,
    "shortDescription" TEXT NOT NULL,
    "cardImage" TEXT,
    "images" TEXT[],
    "address" JSONB,
    "commingSoonMessage" TEXT DEFAULT 'false',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "comingSoon" BOOLEAN NOT NULL DEFAULT false,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "legal" TEXT,
    "registrationFees" INTEGER NOT NULL DEFAULT 500,
    "cinCertificateFile" TEXT,
    "cinNumber" TEXT,
    "gstCertificateFile" TEXT,
    "gstNumber" TEXT,
    "msmeCertificateFile" TEXT,
    "msmeNumber" TEXT,
    "tanCertificateFile" TEXT,
    "tanNumber" TEXT,
    "coords" DOUBLE PRECISION[],
    "Price" INTEGER,
    "avgRating" DOUBLE PRECISION,
    "propertyType" TEXT,
    "uploadElectricityBill" TEXT,
    "uploadLeaseAgreement" TEXT,
    "offlineBookingAllowed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "roomNo" INTEGER NOT NULL,
    "Ac" BOOLEAN NOT NULL DEFAULT false,
    "doorPosition" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0]::INTEGER[],
    "roomName" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "seatId" TEXT NOT NULL,
    "seatLabel" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "rotation" INTEGER NOT NULL DEFAULT 0,
    "seatName" TEXT,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "slotId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "booked" BOOLEAN NOT NULL DEFAULT false,
    "bookedById" INTEGER,
    "bookingSource" TEXT NOT NULL DEFAULT 'app',
    "bookingEndDate" TIMESTAMP(3),
    "seatId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "bookedSeat" JSONB NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "bookingFinalDate" TIMESTAMP(3),
    "bookingPeriod" INTEGER NOT NULL DEFAULT 1,
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "initialPrice" DOUBLE PRECISION NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "roomNo" INTEGER NOT NULL,
    "timeSlotDetails" JSONB,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionDetails" JSONB,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "relationship" TEXT,
    "userId" INTEGER,
    "phoneNumber" TEXT,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingFriend" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "BookingFriend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "libraryId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneOtp" (
    "id" SERIAL NOT NULL,
    "phoneotp" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "PhoneOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "emailotp" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL DEFAULT 'INV-0',
    "libraryaddress" TEXT NOT NULL,
    "libraryName" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhoneNumber" TEXT NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "initialPrice" INTEGER NOT NULL,
    "finalPrice" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "bookingPeriod" INTEGER NOT NULL,
    "bookingStatus" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "timeStamp" TIMESTAMP(6),
    "bookingFinalDate" TIMESTAMP(3) NOT NULL,
    "seatLabel" TEXT NOT NULL,
    "timeSlotDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distance" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Distance_pkey" PRIMARY KEY ("id")
);

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
    "expiresAt" TIMESTAMP(3),
    "isOfflinePayment" BOOLEAN DEFAULT false,
    "offlinePaymentStatus" "OfflinePaymentStatus",

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LibraryBookings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LibraryBookings_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_OwnedProperties" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OwnedProperties_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdhaarCardDetails_adminId_key" ON "AdhaarCardDetails"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "PanCardDetails_adminId_key" ON "PanCardDetails"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_libraryId_key" ON "Amenities"("libraryId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_bookingId_key" ON "Invoice"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

-- CreateIndex
CREATE INDEX "_LibraryBookings_B_index" ON "_LibraryBookings"("B");

-- CreateIndex
CREATE INDEX "_OwnedProperties_B_index" ON "_OwnedProperties"("B");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdhaarCardDetails" ADD CONSTRAINT "AdhaarCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanCardDetails" ADD CONSTRAINT "PanCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_libraryOwnerId_fkey" FOREIGN KEY ("libraryOwnerId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingFriend" ADD CONSTRAINT "BookingFriend_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingFriend" ADD CONSTRAINT "BookingFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distance" ADD CONSTRAINT "Distance_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryBookings" ADD CONSTRAINT "_LibraryBookings_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryBookings" ADD CONSTRAINT "_LibraryBookings_B_fkey" FOREIGN KEY ("B") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnedProperties" ADD CONSTRAINT "_OwnedProperties_A_fkey" FOREIGN KEY ("A") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnedProperties" ADD CONSTRAINT "_OwnedProperties_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
