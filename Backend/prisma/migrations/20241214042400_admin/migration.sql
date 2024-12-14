/*
  Warnings:

  - Added the required column `AddharNumber` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PanNumber` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "AddharNumber" TEXT NOT NULL,
ADD COLUMN     "PanNumber" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
