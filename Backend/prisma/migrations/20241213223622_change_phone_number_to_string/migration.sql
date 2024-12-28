/*
  Warnings:

  - You are about to alter the column `phoneNumber` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - You are about to alter the column `phoneNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "Friend" ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PhoneOtp" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(10);
