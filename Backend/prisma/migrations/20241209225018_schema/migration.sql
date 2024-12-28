-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" VARCHAR(10) NOT NULL,
    "Dob" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "accountType" TEXT NOT NULL DEFAULT 'Admin',
    "address" JSONB,
    "profileImage" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),

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
    "phoneNumber" VARCHAR(10) NOT NULL,
    "password" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "additionalDetails" TEXT[],
    "image" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER,
    "libraryOwnerId" INTEGER,
    "name" TEXT NOT NULL,
    "longDescription" TEXT,
    "shortDescription" TEXT NOT NULL,
    "thumbnail" TEXT[],
    "cardImage" TEXT,
    "images" TEXT[],
    "location" JSONB,
    "address" JSONB,
    "commingSoonMessage" TEXT DEFAULT 'false',
    "coords" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "comingSoon" BOOLEAN NOT NULL DEFAULT false,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "legal" TEXT,
    "cinDetails" TEXT,
    "tanDetails" TEXT,
    "msmeDetails" TEXT,
    "registrationFees" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "Price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "relationship" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
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
    "coldWater" BOOLEAN NOT NULL DEFAULT false,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "ac" BOOLEAN NOT NULL DEFAULT false,
    "locker" BOOLEAN NOT NULL DEFAULT false,
    "separateWashroom" BOOLEAN NOT NULL DEFAULT false,
    "news" BOOLEAN NOT NULL DEFAULT false,
    "discussionArea" BOOLEAN NOT NULL DEFAULT false,
    "lunchArea" BOOLEAN NOT NULL DEFAULT false,
    "movingChair" BOOLEAN NOT NULL DEFAULT false,
    "floorMat" BOOLEAN NOT NULL DEFAULT false,
    "separateParking" BOOLEAN NOT NULL DEFAULT false,
    "commonParking" BOOLEAN NOT NULL DEFAULT false,
    "libraryId" INTEGER NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GstDetails" (
    "id" SERIAL NOT NULL,
    "gstNumber" TEXT,
    "gstCertificateFile" TEXT,
    "libraryId" INTEGER NOT NULL,

    CONSTRAINT "GstDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "roomNo" INTEGER NOT NULL,
    "Ac" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "seatId" TEXT NOT NULL,
    "seatLabel" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

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
    "price" TEXT NOT NULL,
    "bookingEndDate" TIMESTAMP(3),
    "seatId" INTEGER NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Booking_friendId_key" ON "Booking"("friendId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_libraryId_key" ON "Amenities"("libraryId");

-- CreateIndex
CREATE UNIQUE INDEX "GstDetails_libraryId_key" ON "GstDetails"("libraryId");

-- CreateIndex
CREATE INDEX "_LibraryBookings_B_index" ON "_LibraryBookings"("B");

-- CreateIndex
CREATE INDEX "_OwnedProperties_B_index" ON "_OwnedProperties"("B");

-- AddForeignKey
ALTER TABLE "AdhaarCardDetails" ADD CONSTRAINT "AdhaarCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanCardDetails" ADD CONSTRAINT "PanCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_libraryOwnerId_fkey" FOREIGN KEY ("libraryOwnerId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Friend"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenities" ADD CONSTRAINT "Amenities_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GstDetails" ADD CONSTRAINT "GstDetails_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryBookings" ADD CONSTRAINT "_LibraryBookings_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibraryBookings" ADD CONSTRAINT "_LibraryBookings_B_fkey" FOREIGN KEY ("B") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnedProperties" ADD CONSTRAINT "_OwnedProperties_A_fkey" FOREIGN KEY ("A") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnedProperties" ADD CONSTRAINT "_OwnedProperties_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
