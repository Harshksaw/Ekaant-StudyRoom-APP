/*
  Warnings:

  - You are about to drop the column `cinDetails` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `msmeDetails` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `tanDetails` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the `GstDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GstDetails" DROP CONSTRAINT "GstDetails_libraryId_fkey";

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "cinDetails",
DROP COLUMN "msmeDetails",
DROP COLUMN "tanDetails",
ADD COLUMN     "cinCertificateFile" TEXT,
ADD COLUMN     "cinNumber" TEXT,
ADD COLUMN     "gstCertificateFile" TEXT,
ADD COLUMN     "gstNumber" TEXT,
ADD COLUMN     "msmeCertificateFile" TEXT,
ADD COLUMN     "msmeNumber" TEXT,
ADD COLUMN     "tanCertificateFile" TEXT,
ADD COLUMN     "tanNumber" TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "doorPosition" SET DEFAULT ARRAY[0, 0, 0, 0, 0]::FLOAT[];

-- DropTable
DROP TABLE "GstDetails";
